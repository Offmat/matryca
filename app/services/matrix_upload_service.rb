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
