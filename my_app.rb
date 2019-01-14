class MyApp < Sinatra::Base
  get '/' do
    erb :'index.html'
  end
end
