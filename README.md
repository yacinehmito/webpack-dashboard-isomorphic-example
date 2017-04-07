# webpack-dashboard-isomorphic-example

This is an example of a [webpack](http://webpack.js.org)
and [webpack-dashboard](http://github.com/FormidableLabs/webpack-dashboard)
configuration
that allows you to bundle at the same time your server-side code and
client-side code.

This is especially useful for isomorphic apps, which are
expected to share a lot of code between client and server (hence the
name of the repo, to keep it short)

## To get it working

Clone the repo and use your favourite package manager to pull the dependencies.

To start the bundling job, execute in the root directory the following
command:

```
webpack --watch
```

Logs are sent to the standard output, but also to two newly opened unix
sockets in port 3001 and 3002 (so make sure those aren't already used).

Reports for the server bundle are sent to the socket of port 3001, while
reports for the client bundle are sent through the port 3002.

To monitor those, use webpack-dashboard, simply do
`webpack-dashboard --port 3001` and `webpack-dashboard --port 3002` in two
different terminals.

Now, change the code in `client/index.js` or `server/index.js` and see
the bundle work in real-time through a beautiful interface!

We can also start the dashboard before the webpack job in order to
get the output of the first build.

## How it works

Webpack allows you to export multiple configurations to run two bundles at the
same time. In our case we have a configuration for the server and one for
the client.

Each of those make use of `webpack-dashboard/plugin`. The plugin opens
a new socket and sends data at each step of the bundling. Of course, those
sockets use different ports.

## Making it more useful

To keep the example simple, webpack only uses the babel loader. You can
of course change the configuration to your liking.

### What about webpack-dev-server and the like

I have no idea how webpack-dev-server behaves when webpack manages two
bundles. You are welcome to try and tell me how it went.

You can still use the general idea though ; make two webpack
configurations (one for the server, one for the client) that use
`webpack-dashboard/plugin` with two different socket ports.
Start the two webpack jobs independently, then open the dashboards normally
on each port.

## Functionally-relevant customization

Webpack-dashboard allows you to change the color of the frames and the title
of the terminal running the process. If you're running a single instance,
these are just aesthetic configurations. However, if you're running more,
it allows you to easily identify which are which.

I invite you to try this in two different terminals. For the server:

```
webpack-dashboard -p 3001 -c blue -t Server
```

For the client:

```
webpack-dashboard -p 3002 -c yellow -t Client
```

## Automating this using the webpack-dashboard module

For sake of completeness, I include a little program `wd` similar to the one I
use to streamline this. Writing the aforementioned commands is cumbersome, and
you need to make sure to never mix the socket ports.

- `./wd.js bundle` will start the webpack job.
- `./wd.js server` will start the dashboard for the server.
- `./wd.js client` will start the dashboard for the client.

Take a look at the code to see how you can include that to your existing
workflow.

You can change the socket port, terminal title and frame color in
`config.json`. Webpack's config also makes use of `config.json` to open the
sockets on the right ports. No need to repeat yourself!

With some tmux witchcraft you would even be able to run all
this in one command.

## Parallel builds

I didn't try this yet but you should be able to have the two bundles run
concurrently with
[parallel-webpack](https://github.com/trivago/parallel-webpack/).

