class MyApp < Sinatra::Base
  class MatrixUploadService
    attr_reader :frame, :led_matrix, :options
    def initialize(options)
      @frame = LedMatrix::Frame.new
      @led_matrix = LedMatrix::Client.new('192.168.1.56', 3000)
      @options = options
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
        row.each.with_index do |col, x|
          frame.set_pixel(x, y, col[0], col[1], col[2])
        end
      end
    end

    def picture_data
      @picture_data ||= JSON.parse(options)
    end
  end

  get '/' do
    erb :'index.html'
  end

  get '/new' do
    erb :'new.html'
  end

  post '/new' do
    MatrixUploadService.new(params[:data]).call
  end
end
