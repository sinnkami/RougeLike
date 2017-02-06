require "bundler/setup"
Bundler.require(:default)
require "sinatra/reloader"

Dir["models/*.rb"].each do |model|
  require_relative model
end

class App < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  configure do
    set :views, settings.root + "/views"
  end

  helpers do
    def title
      "テスト的なゲーム"
    end
  end

  get "/" do
    slim :index
  end

end
