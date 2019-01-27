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
    YAML.safe_load(File.read(path))
  end

  def path
    @path ||= Dir["data/#{id}_*.json"].first
  end
end
