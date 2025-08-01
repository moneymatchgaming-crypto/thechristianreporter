const axios = require('axios');
const xml2js = require('xml2js');

// Test RSS feeds to check which ones work
const testFeeds = [
  { name: 'Relevant Magazine', url: 'https://relevantmagazine.com/feed/' },
  { name: 'Christianity Today', url: 'https://www.christianitytoday.com/rss' },
  { name: 'Christian Post', url: 'https://www.christianpost.com/rss' },
  { name: 'Worthy News', url: 'https://www.worthynews.com/feed' },
  { name: 'Answers in Genesis', url: 'https://www.answersingenesis.org/dailycontent.xml' },
  { name: 'Catholic News Agency', url: 'https://www.catholicnewsagency.com/rss/news.xml' },
  { name: 'iBelieve', url: 'https://www.ibelieve.com/rss' },
  { name: 'Christianity.com', url: 'https://www.christianity.com/rss' },
  { name: 'Red Letter Christians', url: 'https://www.redletterchristians.org/feed' },
  { name: 'Life Stream', url: 'https://www.lifestream.org/feed' },
  { name: 'Gospel Coalition', url: 'https://www.thegospelcoalition.org/feed/' },
  { name: 'Charisma News', url: 'https://www.charismanews.com/feed' },
  { name: 'Christian Headlines', url: 'https://www.christianheadlines.com/feed' },
  { name: 'Bible Gateway', url: 'https://www.biblegateway.com/blog/feed/' },
  { name: 'The Christian Century', url: 'https://www.christiancentury.org/rss.xml' },
  { name: 'CCM Magazine', url: 'https://www.ccmmagazine.com/feed/' },
  // Additional sources to test
  { name: 'Christian Broadcasting Network', url: 'https://www1.cbn.com/rss/cbnnews.xml' },
  { name: 'Premier Christianity', url: 'https://www.premierchristianity.com/feed' },
  { name: 'Christian Today', url: 'https://www.christiantoday.com/feed' },
  { name: 'Got Questions', url: 'https://www.gotquestions.org/feed.xml' },
  { name: 'Christian Apologetics & Research Ministry', url: 'https://carm.org/feed/' },
  { name: 'Crosswalk', url: 'https://www.crosswalk.com/feed' },
  { name: 'Christianity.com Blog', url: 'https://www.christianity.com/blog/feed/' },
  { name: 'Christianity Today UK', url: 'https://www.christianitytoday.com/uk/feed' },
  { name: 'Christianity Today Women', url: 'https://www.christianitytoday.com/women/feed' },
  { name: 'Christianity Today Church', url: 'https://www.christianitytoday.com/church/feed' },
  { name: 'Christianity Today Leadership', url: 'https://www.christianitytoday.com/leadership/feed' },
  { name: 'Christianity Today Global', url: 'https://www.christianitytoday.com/global/feed' },
  { name: 'Christianity Today Culture', url: 'https://www.christianitytoday.com/culture/feed' },
  { name: 'Christianity Today Pastors', url: 'https://www.christianitytoday.com/pastors/feed' },
  { name: 'Christianity Today Leaders', url: 'https://www.christianitytoday.com/leaders/feed' },
  // New sources to test
  { name: 'Desiring God', url: 'https://www.desiringgod.org/feed' },
  { name: 'Ligonier Ministries', url: 'https://www.ligonier.org/feed/' },
  { name: 'Grace to You', url: 'https://www.gty.org/rss' },
  { name: 'Focus on the Family', url: 'https://www.focusonthefamily.com/feed/' },
  { name: 'Billy Graham Evangelistic Association', url: 'https://billygraham.org/feed/' },
  { name: 'Samaritan\'s Purse', url: 'https://www.samaritanspurse.org/feed/' },
  { name: 'World Vision', url: 'https://www.worldvision.org/feed' },
  { name: 'Compassion International', url: 'https://blog.compassion.com/feed/' },
  { name: 'International Mission Board', url: 'https://www.imb.org/feed/' },
  { name: 'North American Mission Board', url: 'https://www.namb.net/feed/' },
  { name: 'Southern Baptist Convention', url: 'https://www.sbc.net/feed/' },
  { name: 'Assemblies of God', url: 'https://ag.org/feed' },
  { name: 'Presbyterian Church USA', url: 'https://www.pcusa.org/feed/' },
  { name: 'United Methodist Church', url: 'https://www.umc.org/feed/' },
  { name: 'Evangelical Lutheran Church', url: 'https://www.elca.org/feed' },
  { name: 'Christian Reformed Church', url: 'https://www.crcna.org/feed' },
  { name: 'Mennonite Church USA', url: 'https://www.mennoniteusa.org/feed/' },
  { name: 'Brethren in Christ', url: 'https://bic-church.org/feed/' },
  { name: 'Christian and Missionary Alliance', url: 'https://www.cmalliance.org/feed/' },
  { name: 'Wesleyan Church', url: 'https://www.wesleyan.org/feed' },
  { name: 'Free Methodist Church', url: 'https://www.freemethodistchurch.org/feed/' },
  { name: 'Church of the Nazarene', url: 'https://www.nazarene.org/feed/' },
  { name: 'Salvation Army', url: 'https://www.salvationarmy.org/feed' },
  { name: 'YWAM', url: 'https://www.ywam.org/feed/' },
  { name: 'Campus Crusade for Christ', url: 'https://www.cru.org/feed/' },
  { name: 'Navigators', url: 'https://www.navigators.org/feed/' },
  { name: 'InterVarsity Christian Fellowship', url: 'https://intervarsity.org/feed' },
  { name: 'Young Life', url: 'https://www.younglife.org/feed/' },
  { name: 'Fellowship of Christian Athletes', url: 'https://www.fca.org/feed/' },
  { name: 'Athletes in Action', url: 'https://www.athletesinaction.org/feed/' },
  { name: 'Christian Medical & Dental Associations', url: 'https://www.cmda.org/feed/' },
  { name: 'Christian Legal Society', url: 'https://www.clsnet.org/feed' },
  { name: 'Christian Business Men\'s Connection', url: 'https://www.cbmc.com/feed/' },
  { name: 'Full Gospel Business Men\'s Fellowship', url: 'https://www.fgbmfi.org/feed/' },
  { name: 'Promise Keepers', url: 'https://www.promisekeepers.org/feed/' },
  { name: 'Men\'s Fraternity', url: 'https://www.mensfraternity.org/feed/' },
  { name: 'Women of Faith', url: 'https://www.womenoffaith.com/feed/' },
  { name: 'Women of the Word', url: 'https://www.womenoftheword.org/feed/' },
  { name: 'Moms in Prayer', url: 'https://www.momsinprayer.org/feed/' },
  { name: 'Moms in Touch', url: 'https://www.momsintouch.org/feed/' },
  { name: 'Mothers of Preschoolers', url: 'https://www.mops.org/feed/' },
  { name: 'Proverbs 31 Ministries', url: 'https://proverbs31.org/feed/' },
  { name: 'Lysa TerKeurst', url: 'https://lysaterkeurst.com/feed/' },
  { name: 'Ann Voskamp', url: 'https://www.aholyexperience.com/feed/' },
  { name: 'Beth Moore', url: 'https://bethmoore.org/feed/' },
  { name: 'Priscilla Shirer', url: 'https://goingbeyond.com/feed/' },
  { name: 'Kay Arthur', url: 'https://www.precept.org/feed/' },
  { name: 'Kay Warren', url: 'https://kaywarren.com/feed/' },
  { name: 'Lisa TerKeurst', url: 'https://lisaterkeurst.com/feed/' },
  { name: 'Angie Smith', url: 'https://angiesmithonline.com/feed/' },
  { name: 'Lysa TerKeurst Ministries', url: 'https://lysaterkeurstministries.org/feed/' },
  { name: 'Proverbs 31 Ministries Blog', url: 'https://proverbs31.org/blog/feed/' },
  { name: 'She Reads Truth', url: 'https://shereadstruth.com/feed/' },
  { name: 'First 5', url: 'https://first5.org/feed/' },
  { name: 'IF:Gathering', url: 'https://ifgathering.com/feed/' },
  { name: 'IF:Equip', url: 'https://ifequip.com/feed/' },
  { name: 'IF:Local', url: 'https://iflocal.com/feed/' },
  { name: 'IF:Table', url: 'https://iftable.com/feed/' },
  { name: 'IF:Lead', url: 'https://iflead.com/feed/' },
  { name: 'IF:College', url: 'https://ifcollege.com/feed/' },
  { name: 'IF:High School', url: 'https://ifhighschool.com/feed/' },
  { name: 'IF:Middle School', url: 'https://ifmiddleschool.com/feed/' },
  { name: 'IF:Kids', url: 'https://ifkids.com/feed/' },
  { name: 'IF:Men', url: 'https://ifmen.com/feed/' },
  { name: 'IF:Marriage', url: 'https://ifmarriage.com/feed/' },
  { name: 'IF:Parenting', url: 'https://ifparenting.com/feed/' },
  { name: 'IF:Work', url: 'https://ifwork.com/feed/' },
  { name: 'IF:Church', url: 'https://ifchurch.com/feed/' },
  { name: 'IF:Community', url: 'https://ifcommunity.com/feed/' },
  { name: 'IF:World', url: 'https://ifworld.com/feed/' },
  { name: 'IF:Local', url: 'https://iflocal.com/feed/' },
  { name: 'IF:Table', url: 'https://iftable.com/feed/' },
  { name: 'IF:Lead', url: 'https://iflead.com/feed/' },
  { name: 'IF:College', url: 'https://ifcollege.com/feed/' },
  { name: 'IF:High School', url: 'https://ifhighschool.com/feed/' },
  { name: 'IF:Middle School', url: 'https://ifmiddleschool.com/feed/' },
  { name: 'IF:Kids', url: 'https://ifkids.com/feed/' },
  { name: 'IF:Men', url: 'https://ifmen.com/feed/' },
  { name: 'IF:Marriage', url: 'https://ifmarriage.com/feed/' },
  { name: 'IF:Parenting', url: 'https://ifparenting.com/feed/' },
  { name: 'IF:Work', url: 'https://ifwork.com/feed/' },
  { name: 'IF:Church', url: 'https://ifchurch.com/feed/' },
  { name: 'IF:Community', url: 'https://ifcommunity.com/feed/' },
  { name: 'IF:World', url: 'https://ifworld.com/feed/' }
];

async function testFeed(feed) {
  try {
    console.log(`Testing ${feed.name}...`);
    const response = await axios.get(feed.url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (response.status === 200) {
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(response.data);
      
      if (result.rss && result.rss.channel && result.rss.channel[0].item) {
        const items = result.rss.channel[0].item;
        console.log(`✅ ${feed.name}: ${items.length} articles found`);
        return { ...feed, working: true, articleCount: items.length };
      } else {
        console.log(`❌ ${feed.name}: No articles found in RSS`);
        return { ...feed, working: false };
      }
    } else {
      console.log(`❌ ${feed.name}: HTTP ${response.status}`);
      return { ...feed, working: false };
    }
  } catch (error) {
    console.log(`❌ ${feed.name}: ${error.message}`);
    return { ...feed, working: false };
  }
}

async function testAllFeeds() {
  console.log('Testing RSS feeds...\n');
  
  const results = [];
  for (const feed of testFeeds) {
    const result = await testFeed(feed);
    results.push(result);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  const workingFeeds = results.filter(r => r.working);
  const brokenFeeds = results.filter(r => !r.working);
  
  console.log('\n=== RESULTS ===');
  console.log(`✅ Working feeds: ${workingFeeds.length}`);
  console.log(`❌ Broken feeds: ${brokenFeeds.length}`);
  
  console.log('\n=== WORKING FEEDS ===');
  workingFeeds.forEach(feed => {
    console.log(`✅ ${feed.name}: ${feed.articleCount} articles`);
  });
  
  console.log('\n=== BROKEN FEEDS ===');
  brokenFeeds.forEach(feed => {
    console.log(`❌ ${feed.name}`);
  });
  
  return workingFeeds;
}

testAllFeeds().catch(console.error); 