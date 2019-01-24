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
