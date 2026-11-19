import {app} from "./app";
import {config} from "./config";
import {initDb} from "./db";

const main = async () => {
  try {
    await initDb()
    app.listen(config.port, () => {
      console.log(`server connected ${config.port}`)
    })
  } catch (err) {
    console.error(err)
    
  }
}
main()