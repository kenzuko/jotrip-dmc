const page=document.body.dataset.page||'home';
const saved=localStorage.getItem('jotrip-lang');
const lang=saved==='vi'||saved==='en'?saved:((navigator.language||'').toLowerCase().startsWith('vi')?'vi':'en');
const vi=lang==='vi';

const text=(selector,value)=>{const el=document.querySelector(selector);if(el&&value)el.textContent=value;};
const html=(selector,value)=>{const el=document.querySelector(selector);if(el&&value)el.innerHTML=value;};
const many=(selector,values)=>[...document.querySelectorAll(selector)].forEach((el,i)=>{if(values[i]!==undefined)el.textContent=values[i];});

if(page==='home'){
  html('.cover h1',vi?'Phú Quốc,<br><em>đi cùng người hiểu đảo.</em>':'Phu Quoc,<br><em>with someone who knows the island.</em>');
  text('.cover-lead',vi?'Bạn kể tụi mình nghe ai đang đi, ở đâu và muốn những ngày trên đảo có cảm giác thế nào. Phần còn lại - sân bay, xe, biển, bữa ăn và những lúc kế hoạch phải đổi - JoTrip lo.':'Tell us who is coming, where you are staying and how you want your days on the island to feel. JoTrip takes care of the rest - airport, cars, sea, meals and the moments when the plan needs to change.');
  text('.cover-copy .micro',vi?'JOTRIP DMC · NGƯỜI PHÚ QUỐC LÀM DU LỊCH Ở PHÚ QUỐC':'JOTRIP DMC · LOCAL PEOPLE, LOOKING AFTER PHU QUOC JOURNEYS');

  text('.desk-title-block .micro',vi?'MỖI NGÀY TRÊN ĐẢO MỘT KHÁC':'NO TWO ISLAND DAYS FEEL THE SAME');
  html('.desk-title-block h2',vi?'Có những chuyện<br>ở đây mới biết.':'Some things<br>you only learn by being here.');
  text('.desk-card-story h3',vi?'Tụi mình sống với những chi tiết đó mỗi ngày.':'We live with the details every day.');
  text('.desk-card-story p',vi?'Biển hôm nay khác hôm qua, khách ở Bắc đảo khác khách đang ở An Thới, một gia đình có trẻ nhỏ khác một nhóm chỉ muốn dành cả ngày để câu cá. Làm ở đây lâu rồi, mình học cách để ý những chuyện nhỏ đó trước khi xếp lịch.':'The sea changes, hotel location changes the day, and a family with young children does not move like a group that wants to fish until sunset. Living here teaches you to notice those things before you build the itinerary.');
  text('.desk-card-openpq h3',vi?'Trước khi lên lịch, tụi mình coi hôm nay hòn đảo đang ra sao.':'Before making a plan, we check what the island is doing today.');
  text('.desk-card-openpq p',vi?'Thời tiết, sân bay, tàu xe và thông tin thực dụng nằm ở Open Phu Quoc. JoTrip dùng những dữ liệu đó như một phần của việc chăm chuyến đi, chứ không bắt khách phải nhìn dashboard.':'Weather, airport, ferries and practical island information live in Open Phu Quoc. JoTrip uses that context behind the scenes so guests do not have to.');

  html('.atlas h2',vi?'Có người mê biển.<br><em>Có người mê hòn đảo phía sau bãi biển.</em>':'Some come for the sea.<br><em>Some fall for everything around it.</em>');
  text('.atlas-head>p',vi?'Không cần chọn một “gói”. Kể tụi mình nghe bạn thích gì, đi với ai và ở đâu. Từ đó mới biết Phú Quốc nào hợp với chuyến đi này.':'You do not need to choose a package. Tell us what you enjoy, who is travelling and where you are staying. That is enough to start shaping the right Phu Quoc for this trip.');

  html('.practice h2',vi?'Khách thấy nhẹ nhàng<br><em>vì phần khó đã có người giữ.</em>':'The trip feels easy<br><em>because someone is holding the hard parts.</em>');
  text('.practice-head>p:last-child',vi?'Một chuyến private tốt không cần khoe phía sau phức tạp tới đâu. Xe tới đúng lúc, cano đúng loại, bàn ăn hợp người, và khi trời đổi thì đã có phương án khác đủ tốt.':'A good private journey does not need to show how complicated the back end is. The car arrives, the right boat is ready, the table fits the guests, and when the weather changes there is another good answer.');

  html('.journal-preview h2',vi?'Những chuyện<br><em>ở lâu mới để ý.</em>':'Things you notice<br><em>after living here for a while.</em>');
  html('.trade-band h2',vi?'Bạn giữ mối quan hệ với khách.<br><em>Tụi mình chăm phần Phú Quốc.</em>':'You keep the client relationship.<br><em>We take care of Phu Quoc.</em>');
  text('.trade-copy>p:not(.micro)',vi?'Từ khách FIT riêng tư, gia đình nhiều thế hệ tới những ngày biển phức tạp, JoTrip là một đầu mối địa phương chịu trách nhiệm xuyên suốt.':'From private FIT and multi-generation families to complicated marine days, JoTrip gives travel partners one local team that stays responsible all the way through.');

  const whole=document.querySelector('.whole-stay');
  if(whole){
    text('.whole-stay header .micro',vi?'TỪ LÚC KHÁCH CHƯA TỚI ĐẢO':'FROM BEFORE ARRIVAL TO THE LAST RIDE BACK');
    text('.whole-stay header h2',vi?'Tụi mình không chỉ lo một tour. Tụi mình giữ mạch của cả kỳ nghỉ.':'We do not just run a tour. We stay with the whole trip.');
    text('.whole-stay header>p:last-child',vi?'Sân bay, resort, xe, biển, bữa ăn và những thay đổi giữa chừng không nên là sáu việc khách phải tự ráp lại. Với tụi mình, nó là một hành trình.':'Airport, resort, cars, sea days, meals and last-minute changes should not feel like six separate jobs for the guest. To us, they are one journey.');
  }

  const fieldCards=[...document.querySelectorAll('.field-proof .proof-grid article')];
  const fieldCopy=vi?[
    ['AN THỚI','Có hôm nhìn trời rất đẹp mà ra biển lại không dễ chịu.','Tụi mình coi gió, sóng, cảng và nhóm khách trước khi quyết định ngày đó nên đi như dự tính hay đổi nhịp.'],
    ['BẮC - NAM','Một tiếng trên xe sau chuyến bay dài không giống một tiếng sau bữa sáng.','Khách ở Bắc đảo và khách đang ở Nam đảo không nên nhận cùng một lịch trình chỉ vì các điểm trên bản đồ giống nhau.'],
    ['RESORT','Có resort đáng để dành hẳn một buổi sáng không đi đâu.','Khách đã trả tiền cho một nơi ở rất tốt thì lịch trình nên biết nhường chỗ cho chính kỳ nghỉ đó.'],
    ['DƯƠNG ĐÔNG','Chợ không phải sân khấu, người bán hàng cũng không phải đạo cụ.','Đi chợ vui nhất khi khách hiểu mình đang nhìn đời sống thật của một thị trấn trên đảo, không phải một stop để chụp hình.']
  ]:[
    ['AN THOI','Some days look beautiful from shore but are not comfortable on the water.','We check wind, waves, harbour and the people travelling before deciding whether the original marine plan still makes sense.'],
    ['NORTH - SOUTH','An hour in the car after a long flight does not feel like an hour after breakfast.','Guests staying in the north should not get the same day plan as guests already waking up in the south just because the map looks simple.'],
    ['RESORT','Sometimes the right plan is to leave a good resort alone for the morning.','If guests chose an exceptional stay, the itinerary should make room for the holiday they already paid for.'],
    ['DUONG DONG','A market is not a stage, and the people working there are not props.','It becomes more interesting when guests understand they are seeing the everyday life of an island town, not another photo stop.']
  ];
  fieldCards.forEach((card,i)=>{const c=fieldCopy[i];if(!c)return;text(`.field-proof .proof-grid article:nth-child(${i+1})>span`,c[0]);text(`.field-proof .proof-grid article:nth-child(${i+1}) h3`,c[1]);text(`.field-proof .proof-grid article:nth-child(${i+1}) p`,c[2]);});

  const practice=document.querySelector('.practice');
  if(practice&&!document.querySelector('.sunlit-human')){
    practice.insertAdjacentHTML('beforebegin',`<section class="sunlit-human auto-reveal"><div class="sunlit-human-inner"><header class="sunlit-human-head"><p class="micro">${vi?'NGƯỜI LÀM NÊN HÒN ĐẢO':'THE PEOPLE INSIDE THE ISLAND'}</p><h2>${vi?'Phú Quốc đẹp.<br>Nhưng tụi mình nhớ con người nhiều hơn.':'Phu Quoc is beautiful.<br>The people are what stay with us.'}</h2><p>${vi?'Một tài xế biết lúc nào khách cần yên tĩnh. Một bữa ăn được dọn đúng lúc. Một gia đình có khoảng thở riêng. Luxury với JoTrip thường nằm trong những chuyện nhỏ như vậy.':'A driver who knows when guests need quiet. A meal arriving at the right moment. A family having enough room to breathe. For JoTrip, luxury often lives in details like these.'}</p></header><div class="sunlit-human-grid"><figure><img src="/assets/driver-800.webp" alt="JoTrip local team in Phu Quoc" loading="lazy"><figcaption><span>${vi?'NGƯỜI ĐỊA PHƯƠNG':'LOCAL TEAM'}</span><b>${vi?'Có người hiểu đường, hiểu nhịp đảo và hiểu khi nào nên để khách yên.':'Someone who knows the roads, the island rhythm and when to give guests space.'}</b></figcaption></figure><figure><img src="/assets/lunch-800.webp" alt="A JoTrip meal in Phu Quoc" loading="lazy"><figcaption><span>${vi?'BÀN ĂN':'THE TABLE'}</span><b>${vi?'Nhiều ký ức đẹp của chuyến đi nằm quanh một bữa ăn.':'A surprising number of good travel memories happen around a table.'}</b></figcaption></figure><figure><img src="/assets/family-800.webp" alt="Family travelling with JoTrip in Phu Quoc" loading="lazy"><figcaption><span>${vi?'GIA ĐÌNH':'FAMILY'}</span><b>${vi?'Không ai cần đi cùng một tốc độ chỉ vì đang ở cùng một chuyến.':'People do not need the same pace just because they share the same trip.'}</b></figcaption></figure></div></div></section>`);
  }
}

if(page==='experiences'){
  html('.page-hero h1',vi?'Không cần đi thật nhiều.<br><em>Chỉ cần ngày đó đúng với mình.</em>':'You do not need to do everything.<br><em>You need the day to feel right.</em>');
  text('.page-hero-copy>p:not(.micro)',vi?'Có người muốn cả ngày trên biển. Có người chỉ cần một bữa trưa thật lâu rồi về resort. Tụi mình bắt đầu từ người đang đi, không bắt đầu từ danh sách điểm.':'Some people want a full day on the water. Others want one long lunch and an early return to the resort. We start with the people travelling, not a list of stops.');
  text('#sea .story-copy h3',vi?'Ngày biển tốt là ngày còn biết đổi ý.':'A good sea day is allowed to change its mind.');
  text('#roots .story-copy h3',vi?'Nhà thùng hay vườn tiêu chỉ hay khi mình biết câu chuyện phía sau.':'Fish sauce and pepper become interesting when the people behind them stay in the story.');
}

if(page==='phu-quoc'){
  html('.page-hero h1',vi?'Phú Quốc không chỉ có<br><em>một cách để hiểu.</em>':'There is more than one way<br><em>to understand Phu Quoc.</em>');
  text('.page-hero-copy>p:not(.micro)',vi?'Bắc đảo, Dương Đông, bờ đông, An Thới - mỗi vùng có một nhịp khác. Thêm thời tiết, biển, nơi ở và người đang đi, cùng một hòn đảo có thể thành những chuyến rất khác nhau.':'North island, Duong Dong, the east coast and An Thoi all move differently. Add weather, sea, where guests stay and who is travelling, and the same island can become a very different trip.');
}

if(page==='partners'){
  html('.page-hero h1',vi?'Một đầu mối địa phương.<br><em>Ít việc phải đuổi theo hơn.</em>':'One local team.<br><em>Fewer things for you to chase.</em>');
  text('.page-hero-copy>p:not(.micro)',vi?'Bạn hiểu khách của mình. Tụi mình hiểu Phú Quốc và chịu trách nhiệm phần vận hành tại đảo - từ lúc chuyến bay hạ cánh tới lúc khách rời đi.':'You know your client. We know Phu Quoc and stay responsible for the island operation - from the arriving flight to the final departure.');
  const intelligence=document.querySelector('.intelligence-map');
  if(intelligence){text('.intelligence-map header h2',vi?'Phía sau một quyết định thường là rất nhiều chuyện nhỏ.':'Good judgement usually comes from a lot of small facts.');text('.intelligence-map header>p:last-child',vi?'Khách không cần thấy dashboard. Đối tác cũng không cần gọi năm nơi để ráp thông tin. Tụi mình gom bối cảnh lại rồi đưa ra một quyết định có lý do.':'Guests do not need a dashboard, and partners should not need five phone calls to assemble context. We bring the pieces together and make a decision we can explain.');}
}

if(page==='journal'){
  html('.page-hero h1',vi?'Ghi lại những chuyện<br><em>làm nghề rồi mới thấy.</em>':'Notes on the things<br><em>you notice by doing the work.</em>');
  text('.page-hero-copy>p:not(.micro)',vi?'Không phải cẩm nang “10 điểm phải đi”. Chỉ là những quan sát tụi mình thấy hữu ích sau nhiều ngày đưa khách đi, đổi kế hoạch và sống trên đảo.':'Not another list of ten places to see. Just observations that became useful after many days of moving guests, changing plans and living on the island.');
}

if(page==='about'){
  const origin=document.querySelector('#origin');
  if(origin){
    text('#origin .micro',vi?'CÂU CHUYỆN CỦA TỤI MÌNH':'OUR STORY');
    text('#origin h2',vi?'Hòn đảo trong chúng tôi.':'The island we carry with us.');
  }
  const today=document.getElementById('today');
  if(today){const h=today.querySelector('h2');if(h)h.innerHTML=vi?'JoTrip hôm nay vẫn bắt đầu<br><em>từ những chuyện rất nhỏ.</em>':'JoTrip still begins<br><em>with the small things.</em>';}
}
