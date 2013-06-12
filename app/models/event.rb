class Event < ActiveRecord::Base
  attr_accessible :name
  validates :name, :length => { :in => 0..255 }
end
