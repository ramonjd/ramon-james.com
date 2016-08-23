import config from './webpack.config.babel';
import webpack from 'webpack';
import dev from 'webpack-dev-middleware';
import hot from 'webpack-hot-middleware';

export default function(server) {
  const compiler = webpack(config);
  server.use(dev(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));
  server.use(hot(compiler));
}
