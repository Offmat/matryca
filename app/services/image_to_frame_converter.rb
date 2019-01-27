class ImageToFrameConverter
  def initialize(image_path)
    @image_path = image_path
  end

  def call
    frame_array
  end

  private

  def frame_array
    [].tap do |array|
      pixeled_image.each_row_rgb do |row|
        array << row
      end
    end
  end

  def pixeled_image
    Pixels.open_tga(@image_path)
  end
end
