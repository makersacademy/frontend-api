require 'sinatra/base'
require 'json'

class Chitter < Sinatra::Base

  enable :sessions

  get '/' do
    File.read('public/index.html')
  end

  get ('/users/:user_id') do
    File.read('public/userProfile.html')
  end

  run! if app_file == $0
end
