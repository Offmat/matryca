Bundler.require
require 'pixels'

require './app/my_app'
require './app/services/frame_fetcher'
require './app/services/matrix_save_service'
require './app/services/matrix_upload_service'
require './app/services/saved_frames_fetcher'

run MyApp
