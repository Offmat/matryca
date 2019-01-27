class FrameToImageConverter
  def initialize(frame_array, path)
    @frame_array = frame_array
    @path = path
  end

  def call
    save_image
    output.close
  end

  private

  def save_image
    array.each_with_index do |row, y|
      output.put_row_rgb(y, row)
    end
  end

  def array
    JSON.parse(@frame_array)
  end

  def output
    @output ||= Pixels.create_tga(@path, specs)
  end

  def specs
    { width: 21, height: 15, color_depth: 24 }
  end
end
