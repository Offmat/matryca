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
    FrameToImageConverter.new(@frame_array, path).call
  end

  def path
    DIRECTORY + '/' + file_name + '.jpg'
  end

  def file_name
    Time.now.strftime('%Y%m%d%H%M%S') + '_' + @name.gsub(/[^0-9A-Z]/i, '_')
  end
end
