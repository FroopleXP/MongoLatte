<h1>MongoLatte</h1>

Written By: <i><a href="https://twitter.com/4v3ng3dFoREVer">Connor Edwards</a></i>

<p>
	A simple coffee ordering system written in NodeJS, Socket.IO and MongoDB. The idea is to create
	an example showing the use of NodeJS and some of its most popular packages!
</p>

<hr />

<h2>Install Instructions</h2>
<p>For those of you that have used Node before you'll know that the install process for these kind of repo's is pretty simple, for those that haven't you're about to learn something! Find below a list of instructions on how to install NodeJS, MongoDB and anythig else you're going to need in order to get this application running.</p>
<ol>
	<li>
		Install NodeJS, MongoDB and NPM. Node usually comes packaged with NPM but just to be on the safe side we'll install it manually. To do so enter the following command into the <b>Terminal</b> ~<br />

		<code>sudo apt-get update</code><br />
		<code>sudo apt-get install node npm mongodb</code>	
	</li><br />

	<li>
		Open the <b>Terminal</b> and navigate to your web-server directory ~<br />
		<code>cd /var/www/html</code>
	</li><br />

	<li>
		From here you can clone the repository ~<br />
		<code>sudo git clone https://github.com/FroopleXP/MongoLatte.git</code><br />
		This will replicate the repo onto your web-server.
	</li><br />

	<li>
		You can now proceed to install the dependencies needed to get MongoLatte up and running ~<br />
		<code>sudo service mongodb restart</code>
		<code>cd MongoLatte</code><br />
		<code>sudo npm install</code><br />
		<code>nodejs server.js</code>
	</li><br />
	
	<li>
		That's all!
	</li>
</ol>

