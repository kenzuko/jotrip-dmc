const page=document.body.dataset.page||'home';
const saved=localStorage.getItem('jotrip-lang');
const lang=saved==='vi'||saved==='en'?saved:((navigator.language||'').toLowerCase().startsWith('vi')?'vi':'en');
const vi=lang==='vi';
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cards=items=>`<div class="proof-grid">${items.map(i=>`<article><span>${esc(i[0])}</span><h3>${esc(i[1])}</h3><p>${esc(i[2])}</p>${i[3]?`<small>${esc(i[3])}</small>`:''}</article>`).join('')}</div>`;

const wholeStay=vi?{
  eyebrow:'KHÔNG CHỈ LÀ MỘT TOUR',title:'JoTrip giữ cả kỳ nghỉ, không chỉ một ngày đi chơi.',intro:'Một DMC địa phương có giá trị nhất ở những đoạn nối. Khách không cần tự ghép sân bay, resort, xe, biển, bữa ăn và những thay đổi bất ngờ thành một chuyến đi.',
  steps:[['01','TRƯỚC KHI ĐẾN','Hiểu chuyến bay, nơi ở, ai đang đi và điều gì thật sự quan trọng.'],['02','ĐẾN ĐẢO','Đón sân bay, hành lý, xe và nhịp ngày đầu được xử lý theo trạng thái thật của khách.'],['03','Ở LẠI','Resort hay villa là một phần của hành trình, không phải chỉ là điểm đón.'],['04','ĐI RA ĐẢO','Ngày biển, làng nghề, câu cá, ẩm thực hay thiên nhiên được đặt đúng chỗ trong kỳ nghỉ.'],['05','KHI CÓ THAY ĐỔI','Mưa, biển, chuyến bay hay vận hành thay đổi thì kế hoạch cũng phải biết thay đổi.'],['06','RỜI ĐẢO','Giữ mạch tới lúc ra sân bay, bến tàu hoặc chặng tiếp theo.']]
}:{eyebrow:'THE WHOLE STAY',title:'JoTrip holds the stay, not only the tour.',intro:'A local DMC is most useful in the joins. Guests should not have to assemble airport, resort, transport, sea days, dining and last-minute changes into one coherent trip themselves.',steps:[['01','BEFORE ARRIVAL','Read the flight, stay, people travelling and what actually matters.'],['02','ARRIVAL','Airport, luggage, vehicle and the first-day pace respond to how the guest actually arrives.'],['03','THE STAY','A resort or villa is part of the journey, not merely a pickup point.'],['04','OUT INTO THE ISLAND','Sea, roots, fishing, food and nature are placed where they make sense in the stay.'],['05','WHEN THINGS CHANGE','Rain, sea, flights and operations change. The plan needs to know how to change too.'],['06','DEPARTURE','Context stays intact until the airport, ferry or next journey.']]};

const fieldNotes=vi?{
  eyebrow:'BẰNG CHỨNG TỪ THỰC ĐỊA',title:'Những chi tiết nhỏ chỉ rõ mình có thật sự hiểu đảo hay không.',items:[
    ['AN THỚI','Ngày biển bắt đầu từ điều kiện, không bắt đầu từ poster.','Cùng một tuyến đảo nhưng gió, sóng, cảng xuất phát và nhóm khách khác nhau có thể làm cả ngày phải đổi nhịp.','VẬN HÀNH BIỂN'],
    ['BẮC - NAM','Khoảng cách trên bản đồ không nói hết cảm giác của khách.','Khách ở bắc đảo sau chuyến bay dài không nên bị xếp một buổi sáng nam đảo như khách đang ở An Thới.','LOGIC DI CHUYỂN'],
    ['RESORT','Một nơi ở tốt đáng được sử dụng đúng giá trị.','Nếu khách chọn một resort rất tốt vì bãi biển, villa, kids club hay dining, kéo họ ra ngoài cả ngày chỉ để lịch dày hơn là một quyết định kém.','STAY-LED DESIGN'],
    ['DƯƠNG ĐÔNG','Đời sống địa phương không phải một “điểm tham quan”.','Chợ, món ăn, giao thông, người làm nghề và nhịp thị trấn có giá trị khi khách được hiểu bối cảnh, không phải chỉ được đưa tới chụp hình.','LOCAL CONTEXT']]
}:{eyebrow:'PROOF FROM THE FIELD',title:'Small details reveal whether someone really understands the island.',items:[['AN THOI','A sea day starts with conditions, not the poster.','The same island route can need a different pace depending on wind, waves, departure harbour and the people on board.','MARINE OPERATIONS'],['NORTH - SOUTH','Map distance does not describe guest fatigue.','A guest in the north after a long flight should not be planned like someone already waking up in An Thoi.','TRANSFER LOGIC'],['RESORT','A strong stay deserves to be used properly.','If a guest chose a property for its beach, villa, kids club or dining, pulling them away all day just to make the itinerary look full is poor design.','STAY-LED DESIGN'],['DUONG DONG','Local life is not an attraction stop.','Markets, food, traffic, working people and town rhythm have value when context is understood, not merely photographed.','LOCAL CONTEXT']]};

const journeys=vi?{
  eyebrow:'NHỮNG HÌNH DÁNG HÀNH TRÌNH THẬT',title:'Không phải package. Là những việc JoTrip thật sự làm sâu.',intro:'Mỗi hình dáng bên dưới vẫn được chỉnh theo khách, nơi ở, thời tiết và lý do của chuyến đi.',items:[
    ['PRIVATE ISLAND DAY','Một cano riêng, một host riêng, một ngày biết đổi nhịp.','Tuyến, giờ, bữa ăn và phương án lên bờ được sắp quanh nhóm khách thay vì ép khách theo tour ghép.','SEA · PRIVATE'],
    ['BIG-GAME FISHING','Câu cá là mục tiêu chính, không phải đạo cụ trên tour đảo.','Khung 05:00-14:00 hoặc 14:00-21:00 từ An Thới, tùy điều kiện và kiểu câu đáy / jig phù hợp.','FISHING · AN THOI'],
    ['ISLAND ROOTS JOURNEY','Nhà thùng, tiêu, trái cây và bàn ăn được nối thành câu chuyện.','Ít điểm hơn, nhiều bối cảnh hơn - người làm nghề và logic phía sau sản phẩm vẫn hiện diện.','ROOTS · LOCAL'],
    ['CONSERVATION-LED DAY','Thiên nhiên không cần bị biến thành sân khấu.','Những ngày thiên nhiên / bảo tồn chỉ nên được làm khi có đối tác, bối cảnh và cách tham gia đủ tôn trọng.','NATURE · PURPOSE'],
    ['FAMILY RHYTHM','Nhiều thế hệ không cần cùng một tốc độ.','Xe, giờ ăn, khoảng nghỉ, biển và hoạt động được đặt sao cho cả trẻ nhỏ lẫn người lớn tuổi đều có chỗ thở.','FAMILY · BESPOKE'],
    ['STAY-LED JOURNEY','Có những ngày tốt nhất là ngày không rời resort quá lâu.','JoTrip đặt trải nghiệm quanh giá trị của nơi ở, thay vì cạnh tranh với chính kỳ nghỉ mà khách đã chọn.','RESORT · QUIET LUXURY']]
}:{eyebrow:'REAL JOURNEY SHAPES',title:'Not packages. Work JoTrip actually knows how to do deeply.',intro:'Each shape still changes with the guest, stay, conditions and reason for travelling.',items:[['PRIVATE ISLAND DAY','One private boat, one host, one day allowed to change pace.','Route, timing, meal and shore options are shaped around the group instead of forcing the group into a shared-tour rhythm.','SEA · PRIVATE'],['BIG-GAME FISHING','Fishing is the purpose, not a prop on an island tour.','05:00-14:00 or 14:00-21:00 from An Thoi, with bottom fishing / jig logic adapted to conditions and anglers.','FISHING · AN THOI'],['ISLAND ROOTS JOURNEY','Fish sauce, pepper, fruit and a table become one story.','Fewer stops, more context - the people and logic behind island products remain visible.','ROOTS · LOCAL'],['CONSERVATION-LED DAY','Nature does not need to become a stage.','Nature and conservation-led days only make sense with the right partner, context and respectful participation.','NATURE · PURPOSE'],['FAMILY RHYTHM','Several generations do not need the same speed.','Vehicles, meals, pauses, water time and activities are paced so children and older travellers both have room.','FAMILY · BESPOKE'],['STAY-LED JOURNEY','Sometimes the best day does not leave the resort for long.','JoTrip places experiences around the value of the stay instead of competing with the holiday the guest already chose.','RESORT · QUIET LUXURY']]};

const boundaries=vi?{
  eyebrow:'NHỮNG ĐIỀU JOTRIP KHÔNG LÀM',title:'Có lúc chất lượng bắt đầu bằng việc biết nói không.',items:[
    ['01','Không nhồi điểm cho lịch nhìn đầy.','Một khoảng trống đúng chỗ có thể đáng giá hơn thêm một điểm ghé yếu.'],
    ['02','Không ép ngày biển khi điều kiện không hợp.','Đã bán rồi không có nghĩa là phải cố đi bằng mọi giá.'],
    ['03','Không biến người địa phương thành đạo cụ.','Con người, làng nghề và đời sống chỉ xuất hiện khi có bối cảnh và sự tôn trọng.'],
    ['04','Không kéo khách khỏi một nơi ở rất tốt chỉ để bán thêm activity.','Resort có thể là một phần quan trọng của trải nghiệm.'],
    ['05','Không giả vờ chắc chắn khi thực tế chưa chắc chắn.','Một DMC tốt phải nói rõ điều mình biết, điều đang kiểm tra và lựa chọn thay thế.'],
    ['06','Không để khách cảm nhận mọi lần bàn giao nhà cung cấp.','Phía sau có thể phức tạp. Phía trước nên có một mạch trách nhiệm rõ ràng.']]
}:{eyebrow:'WHAT JOTRIP WILL NOT DO',title:'Sometimes quality begins with knowing when to say no.',items:[['01','We do not fill an itinerary just to make it look full.','The right empty space can be worth more than another weak stop.'],['02','We do not force a marine day when conditions do not fit.','Being sold already does not mean it should happen at any cost.'],['03','We do not use local people as travel props.','People, trades and daily life need context and respect.'],['04','We do not pull guests out of an excellent stay simply to sell another activity.','A resort can be an important part of the experience.'],['05','We do not pretend certainty when reality is uncertain.','A good DMC says what is known, what is being checked and what the alternative is.'],['06','We do not make guests feel every supplier handover.','The operation can be complex. Responsibility should feel continuous.']]};

const intelligence=vi?{
  eyebrow:'PHÍA SAU MỘT QUYẾT ĐỊNH',title:'Destination intelligence không phải dashboard. Nó là thứ giúp quyết định đúng hơn.',nodes:[['BỐI CẢNH KHÁCH','Ai đi · ở đâu · ưu tiên gì'],['THỜI TIẾT','Mưa · nhiệt · mây · giờ thực'],['BIỂN','Gió · sóng · cảng · tuyến'],['DI CHUYỂN','Chuyến bay · transit · thời gian xe'],['VẬN HÀNH','Cano · tài xế · nhà hàng · resort'],['CON NGƯỜI','Host · thuyền trưởng · người làm nghề']],result:'PHÁN ĐOÁN JOTRIP',sub:'Một ngày nên đi, giữ, đổi hay bỏ - và vì sao.'
}:{eyebrow:'BEHIND A DECISION',title:'Destination intelligence is not a dashboard. It is what helps judgement get better.',nodes:[['GUEST CONTEXT','Who · where · priorities'],['WEATHER','Rain · heat · cloud · real timing'],['SEA','Wind · waves · harbour · route'],['MOVEMENT','Flight · transit · drive time'],['OPERATIONS','Boat · driver · table · resort'],['PEOPLE','Host · captain · producer']],result:'JOTRIP JUDGEMENT',sub:'Go, hold, modify or leave it out - and why.'};

const evidence=vi?{
  eyebrow:'NGƯỜI THẬT · CHUYẾN ĐI THẬT',title:'Câu chuyện chỉ đáng tin khi có dấu vết của công việc thật.',items:[['/assets/airport-800.webp','ĐÓN KHÁCH','Một hành trình bắt đầu trước khi khách tới resort.'],['/assets/driver-800.webp','ĐỘI NGŨ BẢN ĐỊA','Người hiểu đảo giữ mạch giữa những lần di chuyển.'],['/assets/boat-800.webp','TRÊN BIỂN','Một ngày biển thật, nơi điều kiện luôn có tiếng nói.'],['/assets/lunch-800.webp','BÀN ĂN','Nhiều ký ức của chuyến đi xảy ra quanh một bữa ăn.'],['/assets/family-800.webp','GIA ĐÌNH','Nhịp của người thật quan trọng hơn nhịp của brochure.'],['/assets/resort-800.webp','NƠI Ở','Resort là một phần của thiết kế hành trình.']]
}:{eyebrow:'REAL PEOPLE · REAL JOURNEYS',title:'A story becomes credible when real work leaves evidence.',items:[['/assets/airport-800.webp','ARRIVAL','A journey starts before the guest reaches the resort.'],['/assets/driver-800.webp','LOCAL TEAM','Someone who knows the island carries context between movements.'],['/assets/boat-800.webp','ON THE WATER','A real marine day, where conditions always have a vote.'],['/assets/lunch-800.webp','THE TABLE','Many trip memories happen around a meal.'],['/assets/family-800.webp','FAMILY','The rhythm of real people matters more than brochure rhythm.'],['/assets/resort-800.webp','THE STAY','The property is part of journey design.']]};

const sec=(cls,eyebrow,title,body)=>`<section class="proof-section ${cls} auto-reveal"><div class="proof-inner"><header><p class="micro ink">${esc(eyebrow)}</p><h2>${esc(title)}</h2>${body?`<p>${esc(body)}</p>`:''}</header>`;

if(page==='home'){
  const atlas=document.querySelector('.atlas');
  atlas?.insertAdjacentHTML('beforebegin',`${sec('whole-stay',wholeStay.eyebrow,wholeStay.title,wholeStay.intro)}<div class="stay-line">${wholeStay.steps.map(s=>`<article><b>${esc(s[0])}</b><h3>${esc(s[1])}</h3><p>${esc(s[2])}</p></article>`).join('')}</div></div></section>`);
  const journal=document.querySelector('.journal-preview');
  journal?.insertAdjacentHTML('beforebegin',`${sec('field-proof',fieldNotes.eyebrow,fieldNotes.title,'')}${cards(fieldNotes.items)}</div></section>${sec('evidence-strip',evidence.eyebrow,evidence.title,'')}<div class="evidence-rail">${evidence.items.map(i=>`<figure><img src="${i[0]}" alt="${esc(i[1])}" loading="lazy"><figcaption><span>${esc(i[1])}</span><b>${esc(i[2])}</b></figcaption></figure>`).join('')}</div></div></section>`);
}

if(page==='experiences'){
  const shapes=document.getElementById('shapes');
  shapes?.insertAdjacentHTML('beforebegin',`${sec('real-journeys',journeys.eyebrow,journeys.title,journeys.intro)}${cards(journeys.items)}</div></section>`);
}

if(page==='about'){
  const today=document.getElementById('today');
  today?.insertAdjacentHTML('beforebegin',`${sec('boundaries',boundaries.eyebrow,boundaries.title,'')}${cards(boundaries.items)}</div></section>`);
}

if(page==='partners'){
  const guest=document.getElementById('guest');
  guest?.insertAdjacentHTML('beforebegin',`${sec('intelligence-map',intelligence.eyebrow,intelligence.title,'')}<div class="intel-map"><div class="intel-nodes">${intelligence.nodes.map(n=>`<article><b>${esc(n[0])}</b><span>${esc(n[1])}</span></article>`).join('')}</div><div class="intel-arrow">→</div><div class="intel-result"><strong>${esc(intelligence.result)}</strong><span>${esc(intelligence.sub)}</span></div></div></div></section>`);
}
