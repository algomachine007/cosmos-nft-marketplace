const Cosmic = require("cosmicjs");
const api = Cosmic();
const bucket = api.bucket({
  slug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  read_key: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
});
const cosmosData = async () =>
  await bucket.objects
    .find({
      type: "products",
    })
    .props("slug,title,content")
    .limit(20);
export default cosmosData;
