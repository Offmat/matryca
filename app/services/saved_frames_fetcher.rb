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
    Dir.glob('data/*.json') do |file|
      saved_frames << create_set_from(file)
    end
    saved_frames.sort_by { |hash| hash[:frame_id] }.reverse
  end

  def create_set_from(file)
    {
      frame_id: picture_id_from(file),
      name: picture_name_from(file),
      content: picture_data_from(file)
    }
  end

  def picture_id_from(file)
    file.split('/')[1].split('_')[0]
  end

  def picture_name_from(file)
    file.split('_').drop(1).join('_')
  end

  def picture_data_from(file)
    YAML.safe_load(File.read(file))
  end
end
