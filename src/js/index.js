/**
 * index.html SERVICE HOVER
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
  var serviceHover = function(item){
    if(item.hasClass("active")){
      item.find('.line-white').addClass('hide');
      var imgUrl = item.find('img').attr('src');
      var imgNewUrl = imgUrl.toString().replace('-g','-b');
      item.find('img').attr('src',imgNewUrl)
      item.find('p').css("opacity","1").removeClass('hide');
      item.find('a').removeClass('hide');
      item.find('.bgBlack').addClass('bgBlue');
    }else{
      item.find('.line-white').removeClass('hide');
      var imgUrl = item.find('img').attr('src');
      var imgNewUrl = imgUrl.toString().replace('-b','-g');
      item.find('img').attr('src',imgNewUrl)
      item.find('p').css("opacity","0").addClass('hide');
      item.find('a').addClass('hide');
      item.find('.bgBlack').removeClass('bgBlue');
    }
  }
/**
 * COMMONJS *
 */
function eliText(div){
  div.each(function(i){
      var divH = $(this).height();
      var $p = $("p", $(this)).eq(0);
      while ($p.outerHeight() > divH) {
          $p.text($p.html().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
      };
    });
}

/**
 *LOAD NEWS *
 */
var news = [
  {
    'news_id':1,
    'news_date':"2017-04-13",
    'imgUrl':'/images/news-1.png',
    'newsFrom':'360氦',
    'newsTitle':'极课大数据：教育场景下的人工智能，用大数据提高教学效率',
    'newsContent':'AlphaGo 打败李世石的那一天起，人工智能的浪潮开始向我们涌来，汽车、医疗等赛道成为最先受到冲击的领域，特斯拉等一批企业进入我们的视野；而在教育赛道，“人工智能+教育”的概念也正逐渐兴起，冲击传统的教育模式， 36 氪曾介绍过的乂学教育便是一个例子。',
  }
]

var newsContent1 = '<section class="textblock"><img src="/images/news/news1/news1.jpg" alt=""><p>&nbsp;AlphaGo 打败李世石的那一天起，人工智能的浪潮开始向我们涌来，汽车、医疗等赛道成为最先受到冲击的领域，特斯拉等一批企业进入我们的视野；而在教育赛道，“人工智能+教育”的概念也正逐渐兴起，冲击传统的教育模式， 36 氪曾介绍过的<a href="http://36kr.com/p/5065129.html" target="_self">乂学教育</a>便是一个例子。</p><p>近日，作为“人工智能+教育”的先行者之一，针对 B 端公立校的 K12 大数据教学运营商“极课大数据”（江苏曲速教育科技有限公司）进行了品牌发布，提出“教育智能 EI ”（ EI：Education Intelligence ）的战略方向。&nbsp;</p><p>从赛道背景来看，一直以来，由于 K12 阶段强刚需、高复购率的特点，K12 是众多教育玩家的一块必争之地，具体到“极课大数据”所处的“人工智能+教育”领域，“极课大数据”面临着两方面的竞争，一类是以公立校为目标的传统教育信息化企业，如科大讯飞，另一类则是类似于一起作业、乂学等的后起之秀。</p><p>极课大数据创始人李可佳表示，“自己并不担心目前的竞争格局，相对于传统的教育信息化企业，自己的产品更加垂直，而一起作业、乂学等教育培训企业，则是关注课后，极课大数据关注的是学生的在校 8 小时，可直接在学校对接学生，搜集数据。”</p><p>一直以来，在传统的教育行业，教师每天需要投入大量的时间进行作业批改，而以教学能力为核心的教育从业者需要较高专业性，导致教育行业产出周期长，过程管控难度高，教师之间的教育经验传递效率低。”&nbsp;<strong>因此，从企业创办一开始，极课大数据产品的关注的问题就在于，如何利用大数据和人工智能提高教师效率。</strong></p><p><strong>李可佳给出的答案是，EI ，即教育场景下，基于大数据算法和学生训练数据的人工智能</strong>。通过从帮助教师电子批改作业、批改试卷入手，在不改变教师的传统教学场景和习惯的前提下，极课大数据节省了用户时间，也搜集到了第一手的学生题库数据。据了解，极课大数据平均每天可为每位教师节省 40-60 分钟的时间。</p><p>值得注意的是，极课的题库数据大部分来自于有组织的考试场景，避免了懒惰等非智力因素对题库难度、易错点的影响，题库数据 73% 的数据来自于周练、18% 的数据来自于考试，只有 9% 来自于平时的作业。</p><p>不过，极课所谓的 EI ，绝不仅仅只是批改作业、节省时间一个环节，在搜集题库数据之后，极课大数据的人工智能优势才能够体现出来：极课的第二步，是在搜集数据之后进行数据的可视化转化，帮助师生诊断学情，实现教学精细化管理；第三步则是在学校和师生积累一定数量之后，根据积累的数据，逐步过渡到自适应教学。</p><p>完成上述三个阶段之后，一方面，教师及管理者可进行数据化的校园管理，有权限的管理者或教师随时可以查看各年级、班级、学科的整体成绩；另一方面，学校还能够使用大数据下的云题库，或者根据自己的教学状况，设置自己的校本题库，极课将提供题库分类管理和维护服务。</p><p>此外，极课还为每一位同学建立了个性化的学习方案，每个学生都有自己的个人学习档案，档案中记录了学生每次考试、作业、知识薄弱点的分析情况；根据学生个人的学习档案，教师可以对学生进行个性化的作业设计，实现不同层级、不同难度的作业区隔。</p><p>据了解，极课第一批公立校的选取以华东地区的优秀重点校为主，通过与代理商分成的形式获得渠道，李可佳表示“重点校有一定示范效应，在公立校使用极课的系统之后，必然带来其他学校学习的溢出效应，而对代理商的分成方面，目前极课已将绝大多数利润让与代理商，以用户数量。”</p><p>根据极课提供的数据，目前，极课服务的活跃学校数量已达 1800 余所，教师激活率在 &nbsp;80 %以上 ，平均每所学校的阅卷数为 10 份／每天。此外，极课已搜集了 180 万学生、家长、教师用户的使用习惯，以及 3200 万份学生日常作业考试数据，各校老师自建的校本题库总量约为 100 万份。有关极课大数据的融资和团队情况，此次发布会未做披露。</p><p>李可佳透露，未来，除了公立校辅助教师教学、管理之外，极课大数据的自适应学习引擎还将可能有两种应用场景，一是课外辅导机构，根据极课所推送的学生在校内的学习数据，为学生提供个性化的学习辅导；二是学生私人的超级教师，用于课后自学。</p><p>《教育信息化“十三五”规划》中，明确提出“积极利用云计算、大数据等新技术，创新资源平台、管理平台的建设、应用模式”，可以说，在政策的引导下，基于云计算、大数据的教育信息化还有很大空间。<strong>关于目前的教育信息化格局，李可佳提出，“教育信息化已进入下半场，而 EI （教育场景下的人工智能）则是教育信息化下半场的竞争入场券。”</strong></p><p>本文作者为唐靖东</p></section>';

var loadNews = function(pageId){
  var pageCount = 5;
  var newArr = news.slice(pageId*5,(pageId+1)*5-1);
  var html = ''
  newArr.each(function(i,v){
    html+='<li class="clearfix">';
    html+='<a href="newsIn.html/'+v.news_id+'" class="clearfix">'
  })
}
