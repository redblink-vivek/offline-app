class EventsController < ApplicationController
  respond_to :html, :json
  def index
    if !params[:name].nil?
      @event= Event.create!(:name=> params[:name])
    end
    @event_show= Event.all
    respond_with(@event_show)
  end

end
