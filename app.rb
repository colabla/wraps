require 'sinatra'
require 'stripe'

Tilt.register Tilt::ERBTemplate, 'html.erb'

set :publishable_key, ENV['PUBLISHABLE_KEY']
set :secret_key, ENV['SECRET_KEY']
set :views, Proc.new { File.join(root, "app") }
set :public_folder, Proc.new { File.join(root, "app") }
Stripe.api_key = settings.secret_key

get '/' do
  erb :index
end

post '/charge' do
	@amount = (params[:Amount].to_f * 100).to_i
  puts @amount
	customer = Stripe::Customer.create(
		:email => 'customer@example.com',
		:card  => params[:stripeToken]
	)

	charge = Stripe::Charge.create(
		:amount      => @amount,
		:description => 'Sinatra Charge',
		:currency    => 'usd',
		:customer    => customer.id
	)
	erb :charge, :locals => { :amount => '%.2f' % (@amount.to_f/100) }
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
