class MyApp < Sinatra::Base
  get '/' do
    erb :'index.html'
  end

  get '/new' do
    erb :'new.html'
  end

  post '/new' do
    frame = LedMatrix::Frame.new
    led_matrix = LedMatrix::Client.new('192.168.1.56', 3000)
    data = JSON.parse(params[:data])

    data.each.with_index do |row, y|
      row.each.with_index do |col, x|
        frame.set_pixel(x, y, col[0], col[1], col[2])
      end
    end
    led_matrix.send_frame(frame)
  end
end
