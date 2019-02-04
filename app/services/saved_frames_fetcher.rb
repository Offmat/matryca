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
    Dir.glob('data/*.json') do |frame|
      saved_frames << create_set_from(frame)
    end
    saved_frames.sort_by { |hash| hash[:frame_id] }.reverse
  end

  def create_set_from(frame)
    {
      frame_id: picture_id_from(frame),
      name: picture_name_from(frame),
      frame: YAML.safe_load(File.open(frame))
    }
  end

  def picture_id_from(frame)
    frame.split('/')[1].split('_')[0]
  end

  def picture_name_from(frame)
    frame.split('_').drop(1).join('_').split('.').first
  end
end
