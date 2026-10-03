const page = document.body.dataset.page || 'home';
const saved = localStorage.getItem('jotrip-lang');
const lang = saved === 'vi' || saved === 'en' ? saved : ((navigator.language || '').toLowerCase().startsWith('vi') ? 'vi' : 'en');

const copy = {
  en: {
    home: {
      eyebrow: 'KNOWING THE WHOLE ISLAND',
      title: 'Local knowledge is not a list of places.',
      intro: 'It is knowing how Phu Quoc changes by coast, time of day, weather, sea, distance, hotel location and the people travelling. That is where a destination manager becomes useful.',
      items: [
        ['01 · GEOGRAPHY','North, centre and south are different travel days.','A beautiful place can still be the wrong choice when it creates a poor transfer, an early wake-up or too much road for the people in the car.'],
        ['02 · TIME','The island changes by the hour.','Morning water, midday heat, sunset traffic and an evening in Duong Dong or the south ask for different pacing.'],
        ['03 · SEA & WEATHER','Conditions are part of the itinerary.','Wind, rain and sea state can change comfort, route and even whether a marine day should happen. A good plan has another good plan behind it.'],
        ['04 · THE LIVING ISLAND','Phu Quoc existed before tourism.','Fish sauce houses, fishing, pepper, local food, markets and family businesses are not decorative stops. They make more sense when the people and work behind them remain visible.'],
        ['05 · STAY LOGIC','A great resort changes the program.','Sometimes the best DMC decision is to protect a slow morning, use the property well and place the island around the stay instead of competing with it.'],
        ['06 · PEOPLE','The human layer holds everything together.','A captain, driver, host, producer or restaurant team can turn logistics into a sense of place when the right person is matched to the right guest.']
      ],
      footer: 'Go with local people. Understand the island. Then love the whole journey.',
      link: 'Read Phu Quoc through JoTrip'
    },
    about: {
      eyebrow: 'JOTRIP DMC / WHERE WE BEGAN',
      title: 'The island within us.',
      paragraphs: [
        'There are things about home that feel completely ordinary when you are young. A morning by the sea, boats returning, the smell of fish sauce in a barrel house, or familiar roads leading toward local neighbourhoods.',
        'Then we grew up, had the chance to study, encounter new ideas and enter tourism. We began to see home differently. Things that once felt ordinary turned out to be values not every place has.',
        'Through each guest, each journey and each encounter on this island, we came to understand that Phu Quoc is more than a destination. It is a place where very real emotions remain. The island also taught us the value of sincerity, of connections between people, and of journeys remembered long after the trip has ended.',
        'We are happy that more people are discovering Phu Quoc. Tourism brings new opportunities, new jobs and greater expectations. But the longer we work in this field, the more questions we have about the island\'s future.',
        'How can visitors do more than simply arrive and leave? How can local people share in the opportunities created by growth? And years from now, when we speak about Phu Quoc, will we still have stories of our own to tell?',
        'JoTrip was built from years of doing the work, from what we have learned, and from questions that still do not have complete answers.',
        'We want to do tourism better. And we hope our home becomes better through the things we choose to do.'
      ],
      bridgeEyebrow: 'PHU QUOC LUX → JOTRIP DMC',
      bridgeTitle: 'The name grew. The responsibility grew with it.',
      bridgeBody: 'The years of operating as Phu Quoc Lux became practical ground for JoTrip: meeting flights, moving guests, choosing boats and vehicles, handling meals, reading weather, adapting a day and learning that trust is built in small decisions. JoTrip keeps that local operating memory, but uses it to design the whole stay with more intention.',
      meaningEyebrow: 'WHY JOTRIP',
      meaningTitle: 'A local name with movement in it.',
      meanings: [
        ['DÔ!','The Southern Vietnamese call that brings people together around a table - warm, direct and shared.'],
        ['JOY','A reminder that the point of good operations is not the operation itself, but how the journey feels.'],
        ['JOURNEYS','Not one fixed Phu Quoc for everyone. Different people should be able to meet the island in different ways.']
      ],
      statement: 'One person who understands you. One local ecosystem that understands the island.'
    },
    phuquoc: {
      eyebrow: 'ISLAND LITERACY',
      title: 'Knowing Phu Quoc means knowing what connects the map.',
      intro: 'A DMC should understand more than where things are. It should understand why two good places may not belong in the same day, why the same sea route can feel different tomorrow, and why a guest staying in the north should not be planned like one waking up in the south.',
      items: [
        ['COAST & ZONES','Read the island by travel logic.','The south is shaped by An Thoi and marine access. Duong Dong carries everyday island life. The north often works around resorts, nature and longer transfer geometry. The east coast has its own quieter rhythm and local context.'],
        ['SEASONS & DAYPARTS','Read time, not just date.','A season matters, but so does the hour. Heat, showers, sea breeze, sunset and traffic can change what feels comfortable within the same day.'],
        ['MARINE REALITY','Read the water before promising the postcard.','Boat type, departure point, wind, waves and guest confidence matter. Conditions can move a sea day from go to modify or to another plan entirely.'],
        ['LOCAL ECONOMY','Read what still works when visitors go home.','Fishing, fish sauce, pepper, food, markets and small family businesses are part of the island\'s living economy. They deserve context, not staging.'],
        ['RESORT GEOGRAPHY','Read where the guest chose to stay.','A five-star resort is not simply a pickup point. Its location, restaurants, beach, kids\' facilities and the reason the guest chose it should change the shape of the itinerary.'],
        ['CHANGE','Read the island as it is becoming.','Phu Quoc is changing quickly. New infrastructure and entertainment can sit beside older livelihoods and local neighbourhoods. Good destination work holds both realities without pretending they are the same thing.']
      ]
    },
    experiences: {
      eyebrow: 'BEFORE WE RECOMMEND ANYTHING',
      title: 'A DMC earns trust by knowing when not to sell the obvious choice.',
      intro: 'The experience itself is only the visible part. The useful work happens before it: matching the activity to the guest, the day, the location, the conditions and a credible alternative.',
      items: [
        ['FIT','Who is this actually for?','A serious angler, a first-time snorkeller, grandparents and a family with young children need different equipment, timing and expectations.'],
        ['CONDITIONS','What does today allow?','Marine days, outdoor meals and longer movements should respond to weather and operating reality, not a brochure written months earlier.'],
        ['ACCESS','Where does the day begin and end?','Hotel location, harbour, transfer time and the next commitment determine whether an idea is elegant or exhausting.'],
        ['CONTEXT','What does this experience help the guest understand?','A fish sauce house, pepper garden, market or fishing boat becomes meaningful when connected to people, work and island history.'],
        ['ALTERNATIVE','What happens if the first plan stops making sense?','A bespoke day needs a second good answer, not a lower-quality emergency substitute.'],
        ['MEMORY','What is worth leaving unplanned?','The best private journey still needs breathing room for a long lunch, a conversation, an early return or simply doing nothing for a while.']
      ]
    },
    partners: {
      eyebrow: 'DESTINATION INTELLIGENCE IS PART OF DELIVERY',
      title: 'We do not only book the island. We keep reading it while the guest is here.',
      intro: 'For a travel partner, the value of a local DMC is the combination of access, judgement and continuity. JoTrip keeps practical destination context close to the operation so decisions can change without the guest feeling the machinery behind them.',
      items: [
        ['ARRIVAL','Airport reality enters the plan.','Flight timing, luggage, room readiness and transfer geography can change the first day before the guest reaches the hotel.'],
        ['MARINE','Sea operations are treated as live operations.','Boat, harbour, crew, route and conditions are checked as operating decisions rather than assumed from a fixed program.'],
        ['STAY','The property is part of destination design.','A strong resort, villa or location can create value on its own. We do not remove guests from it simply to make an itinerary look full.'],
        ['LOCAL NETWORK','The right supplier is not always the biggest one.','Drivers, captains, hosts, producers and tables are selected for fit and responsibility, with context carried across handovers.'],
        ['CONTINGENCY','Changes need another credible answer.','When weather, traffic or operations shift, JoTrip explains the trade-off and protects the intent of the day rather than forcing the original sequence.'],
        ['INTELLIGENCE','Open Phu Quoc supports the practical layer.','Weather, airport, transit and island information can inform decisions without turning the guest-facing DMC experience into a dashboard.']
      ]
    }
  },
  vi: {
    home: {
      eyebrow: 'HIỂU CẢ HÒN ĐẢO',
      title: 'Hiểu địa phương không phải là nhớ một danh sách điểm đến.',
      intro: 'Mà là hiểu Phú Quốc thay đổi theo vùng, thời điểm trong ngày, thời tiết, biển, khoảng cách, vị trí resort và chính những người đang đi. Đó là lúc một DMC thật sự có giá trị.',
      items: [
        ['01 · ĐỊA LÝ','Bắc, trung tâm và nam đảo là ba kiểu ngày khác nhau.','Một nơi đẹp vẫn có thể là lựa chọn sai nếu nó kéo theo quãng đường quá dài, giờ dậy quá sớm hoặc quá nhiều thời gian trên xe với nhóm khách đó.'],
        ['02 · THỜI ĐIỂM','Hòn đảo thay đổi theo từng giờ.','Biển buổi sáng, cái nóng giữa trưa, giao thông lúc hoàng hôn và một buổi tối ở Dương Đông hay nam đảo cần những nhịp khác nhau.'],
        ['03 · BIỂN & THỜI TIẾT','Điều kiện là một phần của lịch trình.','Gió, mưa và trạng thái biển có thể đổi độ thoải mái, tuyến đi và cả việc một ngày biển có nên diễn ra hay không. Một kế hoạch tốt luôn có một kế hoạch tốt khác ở phía sau.'],
        ['04 · HÒN ĐẢO ĐANG SỐNG','Phú Quốc có trước ngành du lịch.','Nhà thùng, nghề biển, tiêu, món ăn địa phương, chợ và những cơ sở gia đình không phải đạo cụ. Chúng có ý nghĩa hơn khi người làm nghề và công việc phía sau vẫn được nhìn thấy.'],
        ['05 · LOGIC NƠI Ở','Một resort tốt sẽ làm thay đổi chương trình.','Đôi khi quyết định DMC tốt nhất là giữ lại một buổi sáng chậm, tận dụng chính nơi khách đã chọn ở và đặt các ngày khám phá quanh kỳ nghỉ thay vì cạnh tranh với nó.'],
        ['06 · CON NGƯỜI','Lớp con người nối mọi thứ lại với nhau.','Một thuyền trưởng, tài xế, host, người làm nghề hay đội nhà hàng có thể biến logistics thành cảm giác về nơi chốn khi đúng người gặp đúng khách.']
      ],
      footer: 'Đi cùng người bản địa. Hiểu hòn đảo. Rồi yêu cả hành trình.',
      link: 'Đọc Phú Quốc qua cách JoTrip hiểu đảo'
    },
    about: {
      eyebrow: 'JOTRIP DMC / NƠI CHÚNG TÔI BẮT ĐẦU',
      title: 'Hòn đảo trong chúng tôi.',
      paragraphs: [
        'Có những điều ở quê nhà, khi còn nhỏ, người ta thấy thật bình thường. Một buổi sáng ở biển, những chiếc ghe trở về, mùi nước mắm trong nhà thùng hay những con đường quen thuộc dẫn về phía những xóm làng.',
        'Rồi lớn lên, có cơ hội học hành, tiếp xúc với những điều mới mẻ và bước vào nghề du lịch, chúng tôi dần nhìn quê hương bằng một góc nhìn khác. Những điều từng rất đỗi quen thuộc hóa ra lại là những giá trị mà không phải nơi nào cũng có.',
        'Qua từng vị khách, từng hành trình và những cuộc gặp gỡ trên chính hòn đảo này, chúng tôi dần hiểu rằng Phú Quốc không chỉ là một điểm đến, mà còn là nơi lưu lại những cảm xúc rất thật. Hòn đảo này cũng dạy chúng tôi giá trị của sự chân thành, của những kết nối giữa con người với con người, và của những hành trình được nhớ đến lâu sau khi chuyến đi đã kết thúc.',
        'Chúng tôi vui khi Phú Quốc ngày càng được nhiều người biết đến. Du lịch mang theo những cơ hội mới, những công việc mới và cả những kỳ vọng lớn hơn. Nhưng càng gắn bó với nghề, chúng tôi càng có nhiều câu hỏi về tương lai của hòn đảo.',
        'Làm sao để du khách không chỉ đến rồi đi? Làm sao để những người dân địa phương cũng có cơ hội từ sự phát triển ấy? Và làm sao để mai này, khi nhắc đến Phú Quốc, chúng ta vẫn còn những câu chuyện riêng của mình để kể?',
        'JoTrip được xây dựng từ những kinh nghiệm làm nghề, những điều đã học và cả những câu hỏi chưa có lời giải trọn vẹn ấy.',
        'Chúng tôi muốn làm du lịch tốt hơn. Và mong quê hương cũng tốt đẹp hơn từ những điều mình làm.'
      ],
      bridgeEyebrow: 'PHÚ QUỐC LUX → JOTRIP DMC',
      bridgeTitle: 'Tên gọi lớn lên. Trách nhiệm cũng lớn theo.',
      bridgeBody: 'Những năm làm nghề từ Phú Quốc Lux trở thành nền thực tế cho JoTrip: đón chuyến bay, đưa khách đi, chọn cano và xe, lo bữa ăn, đọc thời tiết, đổi một ngày khi cần và hiểu rằng niềm tin được tạo ra từ những quyết định rất nhỏ. JoTrip giữ lại ký ức vận hành bản địa đó, nhưng dùng nó để thiết kế cả kỳ nghỉ có chủ đích hơn.',
      meaningEyebrow: 'VÌ SAO LÀ JOTRIP',
      meaningTitle: 'Một cái tên địa phương, có chuyển động ở trong đó.',
      meanings: [
        ['DÔ!','Tiếng gọi Nam Bộ kéo mọi người lại gần nhau quanh một bàn ăn - gần gũi, thẳng thắn và có nhau.'],
        ['JOY','Nhắc rằng mục tiêu của vận hành tốt không phải là khoe việc vận hành, mà là cảm giác của hành trình.'],
        ['JOURNEYS','Không có một Phú Quốc cố định cho tất cả. Mỗi người nên có cơ hội gặp hòn đảo theo một cách khác.']
      ],
      statement: 'Một người hiểu bạn. Một hệ sinh thái bản địa hiểu đảo.'
    },
    phuquoc: {
      eyebrow: 'TRI THỨC ĐIỂM ĐẾN',
      title: 'Hiểu Phú Quốc là hiểu những gì nối các điểm trên bản đồ lại với nhau.',
      intro: 'Một DMC không chỉ cần biết mọi thứ nằm ở đâu. Cần hiểu vì sao hai nơi đều hay nhưng không nên ghép trong cùng một ngày, vì sao cùng một tuyến biển ngày mai có thể khác hôm nay, và vì sao khách ở bắc đảo không thể được xếp lịch giống khách thức dậy ở nam đảo.',
      items: [
        ['VÙNG & BỜ BIỂN','Đọc hòn đảo theo logic hành trình.','Nam đảo gắn nhiều với An Thới và lối ra biển. Dương Đông giữ nhịp sống thường ngày. Bắc đảo thường xoay quanh resort, thiên nhiên và quãng di chuyển dài hơn. Bờ đông có nhịp yên hơn và một bối cảnh địa phương khác.'],
        ['MÙA & GIỜ','Đọc thời gian, không chỉ đọc ngày.','Mùa quan trọng, nhưng từng giờ cũng quan trọng. Nóng, mưa cục bộ, gió biển, hoàng hôn và giao thông có thể đổi cảm giác thoải mái ngay trong cùng một ngày.'],
        ['THỰC TẾ TRÊN BIỂN','Đọc mặt nước trước khi hứa một tấm bưu thiếp.','Loại cano, điểm xuất phát, gió, sóng và mức tự tin của khách đều quan trọng. Điều kiện có thể đưa một ngày biển từ đi bình thường sang điều chỉnh hoặc đổi kế hoạch hoàn toàn.'],
        ['KINH TẾ BẢN ĐỊA','Đọc những thứ vẫn vận hành khi khách đã về.','Nghề biển, nước mắm, tiêu, món ăn, chợ và các cơ sở gia đình là một phần của nền kinh tế đang sống. Chúng cần bối cảnh, không cần dàn dựng.'],
        ['ĐỊA LÝ RESORT','Đọc nơi khách đã chọn ở.','Một resort 5 sao không chỉ là điểm đón khách. Vị trí, nhà hàng, bãi biển, tiện ích trẻ em và lý do khách chọn nơi đó phải làm thay đổi cấu trúc lịch trình.'],
        ['SỰ THAY ĐỔI','Đọc cả hòn đảo đang trở thành.','Phú Quốc thay đổi rất nhanh. Hạ tầng và giải trí mới có thể đứng cạnh những sinh kế cũ và xóm làng địa phương. Làm điểm đến tốt là giữ được cả hai thực tế đó mà không giả vờ chúng giống nhau.']
      ]
    },
    experiences: {
      eyebrow: 'TRƯỚC KHI JOTRIP GỢI Ý BẤT CỨ THỨ GÌ',
      title: 'Một DMC tạo niềm tin bằng việc biết khi nào không nên bán lựa chọn hiển nhiên nhất.',
      intro: 'Trải nghiệm chỉ là phần nhìn thấy. Công việc hữu ích nằm ở phía trước: ghép hoạt động với đúng người, đúng ngày, đúng vị trí, đúng điều kiện và có một phương án thay thế đủ tốt.',
      items: [
        ['ĐỘ PHÙ HỢP','Thứ này thật sự dành cho ai?','Người câu cá nghiêm túc, người mới lặn ngắm san hô, ông bà và gia đình có trẻ nhỏ cần thiết bị, thời gian và kỳ vọng khác nhau.'],
        ['ĐIỀU KIỆN','Hôm nay cho phép điều gì?','Ngày biển, bữa ăn ngoài trời và những chặng di chuyển dài phải phản ứng với thời tiết và thực tế vận hành, không phải brochure viết từ nhiều tháng trước.'],
        ['TIẾP CẬN','Ngày đó bắt đầu và kết thúc ở đâu?','Vị trí khách sạn, cảng, thời gian xe và cam kết tiếp theo quyết định một ý tưởng là thanh lịch hay mệt mỏi.'],
        ['BỐI CẢNH','Trải nghiệm này giúp khách hiểu thêm điều gì?','Một nhà thùng, vườn tiêu, khu chợ hay chiếc tàu cá trở nên có ý nghĩa khi được nối với con người, công việc và lịch sử của đảo.'],
        ['PHƯƠNG ÁN B','Nếu kế hoạch đầu tiên không còn hợp lý thì sao?','Một ngày bespoke cần câu trả lời thứ hai đủ tốt, không phải một phương án chữa cháy kém hơn.'],
        ['KÝ ỨC','Điều gì đáng để không lên lịch?','Một hành trình private tốt vẫn cần khoảng thở cho bữa trưa kéo dài, một cuộc trò chuyện, về sớm hoặc đơn giản là không làm gì trong một lúc.']
      ]
    },
    partners: {
      eyebrow: 'DESTINATION INTELLIGENCE LÀ MỘT PHẦN CỦA VẬN HÀNH',
      title: 'JoTrip không chỉ đặt dịch vụ trên đảo. Tụi mình tiếp tục đọc hòn đảo trong lúc khách đang ở đây.',
      intro: 'Với đối tác lữ hành, giá trị của DMC địa phương nằm ở ba thứ: khả năng tiếp cận, phán đoán và tính liên tục. JoTrip giữ bối cảnh điểm đến sát với vận hành để quyết định có thể thay đổi mà khách không phải thấy bộ máy phía sau.',
      items: [
        ['ĐẾN ĐẢO','Thực tế sân bay đi vào kế hoạch.','Giờ bay, hành lý, tình trạng phòng và địa lý di chuyển có thể đổi cả ngày đầu trước khi khách tới resort.'],
        ['BIỂN','Vận hành biển được xem là vận hành sống.','Cano, cảng, ê-kíp, tuyến và điều kiện được kiểm như quyết định vận hành, không mặc định từ một chương trình cố định.'],
        ['NƠI Ở','Khách sạn là một phần của thiết kế điểm đến.','Một resort, villa hay vị trí tốt tự nó đã tạo ra giá trị. JoTrip không kéo khách ra khỏi nơi đó chỉ để lịch trình trông cho đầy.'],
        ['MẠNG LƯỚI BẢN ĐỊA','Nhà cung cấp phù hợp không phải lúc nào cũng là nhà cung cấp lớn nhất.','Tài xế, thuyền trưởng, host, người làm nghề và bàn ăn được chọn theo độ phù hợp và trách nhiệm, với bối cảnh của khách được giữ xuyên qua các lần bàn giao.'],
        ['DỰ PHÒNG','Thay đổi cần một câu trả lời đủ tin cậy khác.','Khi thời tiết, giao thông hay vận hành đổi, JoTrip giải thích đánh đổi và giữ ý định của ngày thay vì cố ép thứ tự ban đầu.'],
        ['TRI THỨC','Open Phu Quoc hỗ trợ lớp thông tin thực dụng.','Thời tiết, sân bay, transit và thông tin đảo có thể đi vào quyết định mà không biến trải nghiệm DMC dành cho khách thành một dashboard.']
      ]
    }
  }
};

const c = copy[lang];
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const cards = items => `<div class="story-grid">${items.map(([k,t,b])=>`<article class="story-card"><span>${esc(k)}</span><h3>${esc(t)}</h3><p>${esc(b)}</p></article>`).join('')}</div>`;
const section = (className, eyebrow, title, intro, items) => `<section class="story-depth ${className} auto-reveal"><div class="story-depth-inner"><header class="story-depth-head"><p class="micro ink">${esc(eyebrow)}</p><h2>${esc(title)}</h2><p>${esc(intro)}</p></header>${cards(items)}</div></section>`;
const insertBefore = (reference, html) => reference?.insertAdjacentHTML('beforebegin', html);
const addNav = (id, label, beforeId = null) => {
  const nav = document.querySelector('.page-localnav');
  if (!nav || nav.querySelector(`a[href="#${id}"]`)) return;
  const a = document.createElement('a');
  a.href = `#${id}`;
  a.textContent = label;
  const before = beforeId ? nav.querySelector(`a[href="#${beforeId}"]`) : null;
  before ? before.before(a) : nav.append(a);
};

if (page === 'home') {
  const anchor = document.querySelector('.atlas');
  const h = c.home;
  insertBefore(anchor, `${section('home-island-literacy',h.eyebrow,h.title,h.intro,h.items)}<section class="local-statement auto-reveal"><div><p>${esc(h.footer)}</p><a href="/phu-quoc/">${esc(h.link)} <span>↗</span></a></div></section>`);
}

if (page === 'about') {
  const a = c.about;
  const origin = document.getElementById('origin');
  if (origin) {
    origin.className = 'origin-story story-depth auto-reveal';
    origin.innerHTML = `<div class="origin-story-inner"><header><p class="micro ink">${esc(a.eyebrow)}</p><h2>${esc(a.title)}</h2></header><div class="origin-prose">${a.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div><aside class="origin-bridge"><span>${esc(a.bridgeEyebrow)}</span><h3>${esc(a.bridgeTitle)}</h3><p>${esc(a.bridgeBody)}</p></aside></div>`;
  }
  const belief = document.getElementById('belief');
  if (belief) belief.insertAdjacentHTML('afterend', `<section class="brand-meaning story-depth auto-reveal" id="why-jotrip"><div class="story-depth-inner"><header class="story-depth-head"><p class="micro ink">${esc(a.meaningEyebrow)}</p><h2>${esc(a.meaningTitle)}</h2></header>${cards(a.meanings)}<p class="brand-statement">${esc(a.statement)}</p></div></section>`);
  addNav('why-jotrip', lang === 'vi' ? 'Vì sao JoTrip' : 'Why JoTrip', 'care');
}

if (page === 'phu-quoc') {
  const p = c.phuquoc;
  const south = document.getElementById('south');
  insertBefore(south, section('island-literacy',p.eyebrow,p.title,p.intro,p.items).replace('<section class="story-depth island-literacy auto-reveal">','<section class="story-depth island-literacy auto-reveal" id="literacy">'));
  addNav('literacy', lang === 'vi' ? 'Hiểu đảo' : 'Island literacy', 'south');
}

if (page === 'experiences') {
  const e = c.experiences;
  const sea = document.getElementById('sea');
  insertBefore(sea, section('experience-judgement',e.eyebrow,e.title,e.intro,e.items).replace('<section class="story-depth experience-judgement auto-reveal">','<section class="story-depth experience-judgement auto-reveal" id="before">'));
  addNav('before', lang === 'vi' ? 'Trước khi gợi ý' : 'Before we recommend', 'sea');
}

if (page === 'partners') {
  const p = c.partners;
  const workflow = document.getElementById('workflow');
  insertBefore(workflow, section('partner-intelligence',p.eyebrow,p.title,p.intro,p.items).replace('<section class="story-depth partner-intelligence auto-reveal">','<section class="story-depth partner-intelligence auto-reveal" id="intelligence">'));
  addNav('intelligence', lang === 'vi' ? 'Destination intelligence' : 'Destination intelligence', 'workflow');
}
