Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :show]
    resource :session, only: [:show, :create, :destroy]
    resources :boards, only: [:index, :show, :create, :update, :destroy]
    resources :pins, only: [:index, :show, :create, :update, :destroy]
  end

  # post 'api/test', to: 'application#test'
  get '*path', to: "static_pages#frontend_index"

  
end
