Offlineapp::Application.routes.draw do


offline = Rails::Offline.configure :cache_interval => 3000 do
  cache_buster_timestamp = "20120429"
  cache ActionController::Base.helpers.asset_path("application.css")
  cache ActionController::Base.helpers.asset_path("application.js")
 files = Dir[
   "#{root}/**/*.html.erb",
   "#{root}/stylesheets/**/*.css",
   "#{root}/javascripts/**/*.js",
   "#{root}/images/**/*.*"]
 files.each do |file|
   file = file + "?" + cache_buster_timestamp
   cache Pathname.new(file).relative_path_from(root)
 end
 network "*"
end
match "/application.manifest" => offline	
resources :events
root :to => 'events#index'






end
