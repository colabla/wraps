require 'sinatra'
require 'stripe'

Tilt.register Tilt::ERBTemplate, 'html.erb'

set :publishable_key, ENV['PUBLISHABLE_KEY']
set :secret_key, ENV['SECRET_KEY']
set :views, Proc.new { File.join(root, "app") }
set :public_folder, Proc.new { File.join(root, "app") }
Stripe.api_key = settings.secret_key

get '/' do
  send_file 'app/index.html'
end

post '/charge' do
	puts 'here are the params' 
	puts params
	@amount = (params[:amount])
	@size = (params[:size])
	@plan = (params[:plan])
	@month = (params[:month])
	@email = (params[:email])
	@description = (params[:description])
	puts @month
	puts @size
  puts @amount
  puts @plan
  puts @email
	customer = Stripe::Customer.create(
		:email => @email,
		:description => @description,
		:card  => params[:stripeToken]

	)

	charge = Stripe::Charge.create(
		:amount      => @amount,
		:description => 'Wraps Charge',
		:currency    => 'usd',
		:customer    => customer.id,
		:metadata => {'quantity' => @plan, 'size' => @size, 'month' => @month}
	)

	# validate formData price month quantity 
	
	redirect '#/form/thankyou'
end
error Stripe::CardError do
	  env['sinatra.error'].message
end

__END__

@@ layout
<!DOCTYPE html>
<html>
	<head></head>
	<body>
    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
		<%= yield %>

	</body>
</html>


@@ charge
  <h2>Thanks, you paid <strong>$<%= amount %></strong>!</h2>
