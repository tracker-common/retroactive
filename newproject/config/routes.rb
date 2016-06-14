Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'

  get 'users/check/:email' => 'user#check', :constraints => { :email => /[^\/]+/ }
  get 'users/token/:email/:token' => 'user#editToken', :constraints => { :email => /[^\/]+/ }
  get 'users/projects/:projectIds' => 'user#getProjects', :constraints => { :email => /[^\/]+/ }


  get 'retros/:retroId' => 'retro#get'
  post 'retros/new' => 'retro#create'
  post 'retros/additem/:retroId/:column' => 'retro#addItem'
  post 'retros/editItemText/:retroId/:item' => 'retro#editItem'
  post 'retros/editActionText/:retroId/:item' => 'retro#editAction'
  post 'retros/addActionItem/:retroId/:item' => 'retro#newAction'
  post 'retros/vote/' => 'retro#addVote'
  post 'retros/unvote/' => 'retro#removeVote'
  

  delete '/retros/deleteActionItem/:retroId/:item' => 'retro#deleteAction'
  delete '/retros/delete/:retroId' => 'retro#delete'
  delete '/retros/deleteItem/:retroId/:item' => 'retro#deleteRetroItem'


  #match '/client', :to => redirect('/client/app.js')
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase
  
  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
  get '*path' => 'welcome#index'
end
