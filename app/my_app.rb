class MyApp < Sinatra::Base
  get '/' do
    erb :'index.html'
  end

  get '/new' do
    erb :'new.html'
  end

  post '/new' do
    MatrixSaveService.new(params[:data], params[:name]).call
    nil
  end

  post '/show' do
    MatrixUploadService.new(params[:data]).call
    nil
  end
end
