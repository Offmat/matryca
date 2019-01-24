class MyApp < Sinatra::Base

  class MatrixSaveService
    DIRECTORY = 'data'.freeze

    def initialize(frame_array, name)
      @frame_array = frame_array
      @name = name
    end

    def call
      save
    end

    private

    def save
      Dir.mkdir(DIRECTORY) unless File.exist?(DIRECTORY)
      File.open("#{DIRECTORY}/#{file_name}.json", 'wb') do |f|
        f.write @frame_array
      end
    end

    def file_name
      Time.now.strftime('%Y%m%d%H%M%S') + '_' + @name.gsub(/[^0-9A-Z]/i, '_')
    end
  end

  class MatrixUploadService
    attr_reader :frame, :led_matrix, :frame_array
    def initialize(frame_array)
      @frame = LedMatrix::Frame.new
      @led_matrix = LedMatrix::Client.new('192.168.1.56', 3000)
      @frame_array = frame_array
    end

    def call
      draw
      upload
    end

    private

    def upload
      led_matrix.send_frame(frame)
    end

    def draw
      picture_data.each.with_index do |row, y|
        row.each.with_index do |cell, x|
          frame.set_pixel(x, y, cell[0], cell[1], cell[2])
        end
      end
    end

    def picture_data
      @picture_data ||= JSON.parse(frame_array)
    end
  end

  get '/' do
    erb :'index.html'
  end

  get '/new' do
    erb :'new.html'
  end

  post '/new' do
    MatrixSaveService.new(params[:data], params[:name]).call
    nil
  end

  post '/show' do
    MatrixUploadService.new(params[:data]).call
  end
end
