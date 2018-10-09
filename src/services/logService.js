// import Raven from 'raven-js';

function init(){
    // Raven.config("https://7e065e7985e7464892c7d87fe3d8a831@sentry.io/1296548", {
    //   release: "1-0-0",
    //   environment: "development-test"
    // }).install();
}

function log(error){
    console.log(error);
    
    // Raven.captureException(error);
}

export default{
    init,
    log
}