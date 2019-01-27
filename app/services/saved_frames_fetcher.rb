require 'yaml'

class SavedFramesFetcher
  attr_reader :saved_frames

  def initialize
    @saved_frames = []
  end

  def call
    frames
  end

  private

  def frames
    Dir.glob('data/*.jpg') do |img|
      saved_frames << create_set_from(img)
    end
    saved_frames.sort_by { |hash| hash[:frame_id] }.reverse
  end

  def create_set_from(img)
    {
      frame_id: picture_id_from(img),
      name: picture_name_from(img),
      img: img
    }
  end

  def picture_id_from(img)
    img.split('/')[1].split('_')[0]
  end

  def picture_name_from(img)
    img.split('_').drop(1).join('_')
  end
end
