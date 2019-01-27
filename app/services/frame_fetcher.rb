require 'yaml'

class FrameFetcher
  attr_reader :id

  def initialize(id)
    @id = id
  end

  def call
    frame
  end

  private

  def frame
    ImageToFrameConverter.new(path).call
  end

  def path
    @path ||= Dir["data/#{id}_*.jpg"].first
  end
end
