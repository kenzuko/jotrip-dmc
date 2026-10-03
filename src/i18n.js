const originals = new WeakMap();

export const messages = {
  en: {
    langName:'EN', startJourney:'Start a journey', journeyPaper:'Journey paper', home:'Home',
    experiences:'Experiences', phuQuoc:'Phu Quoc', fieldNotes:'Field notes', partners:'Travel partners', about:'About',
    openPQ:'Open PQ ↗', openPhuQuoc:'Open Phu Quoc ↗', close:'Close',
    journeyEyebrow:'BEGIN WITH THE PEOPLE, NOT THE PROGRAM',
    journeyTitle:'Tell us what kind of trip you have in mind.',
    journeyIntro:'You do not need an itinerary. Dates, who is travelling, what matters and what you want less of are enough to begin.',
    when:'When are you travelling?', who:'Who is travelling?', stay:'Where are you staying, or what kind of stay do you imagine?',
    more:'What do you want more of?', avoid:'What would you rather avoid?', yours:'What would make this trip feel like yours?',
    phWhen:'Dates or time of year', phWho:'Couple, family, friends, group...', phStay:'Resort, villa, still deciding...',
    phMore:'Sea, food, quiet, nature, family time...', phAvoid:'Crowds, long transfers, over-planning...', phYours:'Tell us the small things that matter...',
    review:'Review this journey paper', preview:'Preview mode: nothing is sent automatically yet.',
    photoCredit:'Additional documentary photography: Unsplash.', travelPersonal:'TRAVEL, MADE PERSONAL.'
  },
  vi: {
    langName:'VI', startJourney:'Bắt đầu hành trình', journeyPaper:'Phiếu hành trình', home:'Trang chủ',
    experiences:'Trải nghiệm', phuQuoc:'Phú Quốc', fieldNotes:'Ghi chép đảo', partners:'Đối tác lữ hành', about:'Về JoTrip',
    openPQ:'Open PQ ↗', openPhuQuoc:'Open Phu Quoc ↗', close:'Đóng',
    journeyEyebrow:'BẮT ĐẦU TỪ CON NGƯỜI, KHÔNG PHẢI LỊCH TRÌNH',
    journeyTitle:'Kể cho JoTrip nghe chuyến đi bạn đang nghĩ tới.',
    journeyIntro:'Bạn chưa cần có sẵn lịch trình. Ngày đi, ai sẽ đi cùng, điều gì quan trọng và điều gì bạn muốn ít hơn là đủ để bắt đầu.',
    when:'Bạn dự định đi khi nào?', who:'Ai sẽ đi cùng?', stay:'Bạn đang ở đâu, hoặc hình dung chỗ ở như thế nào?',
    more:'Bạn muốn chuyến đi có thêm điều gì?', avoid:'Bạn muốn tránh điều gì?', yours:'Điều gì sẽ khiến chuyến đi này thật sự là của bạn?',
    phWhen:'Ngày cụ thể hoặc thời điểm trong năm', phWho:'Cặp đôi, gia đình, bạn bè, nhóm...', phStay:'Resort, villa, vẫn đang cân nhắc...',
    phMore:'Biển, ẩm thực, yên tĩnh, thiên nhiên, thời gian gia đình...', phAvoid:'Đông đúc, di chuyển dài, lịch quá dày...', phYours:'Kể những điều nhỏ nhưng quan trọng với bạn...',
    review:'Xem lại phiếu hành trình', preview:'Bản xem thử: hiện chưa tự động gửi dữ liệu.',
    photoCredit:'Ảnh tư liệu bổ sung: Unsplash.', travelPersonal:'MỖI CHUYẾN ĐI, MỘT CÂU CHUYỆN RIÊNG.'
  }
};

const vi = {
  'Skip to content':'Bỏ qua đến nội dung chính',
  'Phu Quoc,':'Phú Quốc,', 'from the inside.':'từ bên trong.',
  'Not a catalogue of tours. A local team that knows how the island moves, and how to shape it around the people who arrive here.':'Không phải một danh mục tour. Là một đội ngũ bản địa hiểu hòn đảo vận hành ra sao và biết cách sắp xếp nó quanh những người thật sự đang đến đây.',
  'Read the island':'Đọc hòn đảo', 'Start with your trip':'Bắt đầu từ chuyến đi của bạn',
  'ISLAND DESK':'BÀN ĐẢO', 'FIELD NOTE':'GHI CHÉP',
  'Some days are better when the itinerary has room to change.':'Có những ngày đẹp hơn khi lịch trình còn chừa chỗ để thay đổi.',
  'EXPLORE':'KHÁM PHÁ', 'Sea, roots, wild and moments':'Biển, cội rễ, hoang dã và những khoảnh khắc',
  'TRADE':'ĐỐI TÁC', 'For advisors and travel partners':'Dành cho cố vấn và đối tác lữ hành',
  'ISLAND INTELLIGENCE':'THÔNG TIN HÒN ĐẢO',
  'OUT ON THE WATER':'TRÊN MẶT BIỂN', 'THE WORKING ISLAND':'HÒN ĐẢO ĐANG SỐNG', 'READING PHU QUOC':'ĐỌC PHÚ QUỐC',
  'THE ISLAND IS NOT ONE THING':'HÒN ĐẢO KHÔNG CHỈ CÓ MỘT GƯƠNG MẶT',
  'A place to read,':'Một nơi để hiểu,', 'not rush through.':'không phải để chạy cho hết.',
  'Local notebook':'Sổ tay bản địa',
  'There is the island visitors see first. Then there is the one revealed by timing, weather, people, a table, a boat and the small decisions that happen between plans.':'Có một Phú Quốc du khách nhìn thấy ngay. Và còn một Phú Quốc khác chỉ lộ ra qua thời điểm, thời tiết, con người, một bàn ăn, một chiếc thuyền và những quyết định nhỏ nằm giữa các kế hoạch.',
  'Open field notes':'Mở ghi chép đảo', 'DAILY LIFE · DUONG DONG':'ĐỜI SỐNG · DƯƠNG ĐÔNG', 'Real Phu Quoc, beyond the brochure.':'Phú Quốc thật, ngoài những gì brochure kể.',
  'Need facts before feelings?':'Cần dữ liệu trước cảm xúc?',
  'Weather, airport, transit and practical island information belong in Open Phu Quoc. JoTrip uses the island. Open Phu Quoc explains it.':'Thời tiết, sân bay, giao thông và thông tin thực dụng thuộc về Open Phu Quoc. JoTrip vận hành trên đảo. Open Phu Quoc giải thích hòn đảo.',
  'Open island intelligence':'Mở thông tin hòn đảo', 'EXPERIENCE ATLAS':'BẢN ĐỒ TRẢI NGHIỆM',
  'Four ways into':'Bốn lối bước vào', 'the same island.':'cùng một hòn đảo.',
  'Choose a thread. The picture, pace and kind of access change with it. This is not a list of packages - it is how JoTrip begins reading what kind of Phu Quoc might fit you.':'Chọn một mạch trải nghiệm. Hình ảnh, nhịp đi và cách tiếp cận cũng đổi theo. Đây không phải danh sách gói tour - đây là cách JoTrip bắt đầu đọc xem Phú Quốc nào hợp với bạn.',
  'Sea':'Biển','Roots':'Cội rễ','Wild':'Hoang dã','Moments':'Khoảnh khắc',
  'Private water, island rhythm, conditions first.':'Biển riêng, nhịp đảo và điều kiện thực tế trước tiên.',
  'Flavour, craft, makers and the island beneath the postcard.':'Hương vị, nghề thủ công, người làm nghề và hòn đảo phía sau tấm bưu thiếp.',
  'Fishing, diving, nature and the further edge of the island.':'Câu cá, lặn biển, thiên nhiên và phần xa hơn của hòn đảo.',
  'Family, celebration, quiet time and what stays after the trip.':'Gia đình, kỷ niệm, khoảng lặng và những gì còn ở lại sau chuyến đi.',
  'CURRENT THREAD':'MẠCH ĐANG XEM', 'Sea, without forcing the day.':'Biển, không ép ngày đi theo kế hoạch.',
  'Boat, route and timing are shaped around the group and real conditions. The point is not to collect islands. It is to make the day feel right.':'Thuyền, tuyến và thời gian được chọn quanh nhóm khách và điều kiện thật. Mục tiêu không phải sưu tầm thật nhiều đảo, mà là để ngày hôm đó vừa vặn.',
  'Explore Sea':'Xem Biển',
  'PEOPLE · MOVEMENT · MEMORY':'CON NGƯỜI · CHUYỂN ĐỘNG · KÝ ỨC', 'The parts between':'Những phần nằm giữa', 'the highlights.':'các điểm nổi bật.',
  'ARRIVAL':'ĐẾN ĐẢO','The journey starts before the hotel.':'Hành trình bắt đầu trước khi tới khách sạn.',
  'PEOPLE':'CON NGƯỜI','Someone who knows the island is already here.':'Đã có một người hiểu đảo ở đây chờ bạn.',
  'TABLE':'BÀN ĂN','Many memories happen around food.':'Nhiều ký ức bắt đầu quanh một bàn ăn.',
  'CRAFT':'NGHỀ','Some stories have been fermenting for years.':'Có những câu chuyện đã ủ qua nhiều năm.',
  'FAMILY':'GIA ĐÌNH','Different ages need different rhythms.':'Mỗi độ tuổi cần một nhịp khác nhau.',
  'PACE':'NHỊP ĐI','Not every hour needs a plan.':'Không phải giờ nào cũng cần có kế hoạch.',
  'ISLAND':'HÒN ĐẢO','The working sea is part of the view.':'Biển mưu sinh cũng là một phần của phong cảnh.',
  'DMC PRACTICE':'CÁCH JOTRIP LÀM DMC','Beautiful trips need':'Một chuyến đi đẹp cần','unseen work.':'rất nhiều việc không cần phô ra.',
  'Private travel feels simple only when somebody is holding the complexity behind it. JoTrip stays close to the moving parts on the island.':'Một chuyến đi riêng chỉ có thể trông đơn giản khi có người giữ phần phức tạp ở phía sau. JoTrip ở gần những mắt xích đang chuyển động trên đảo.',
  '01 · CONTINUITY':'01 · LIÊN TỤC','One local context from arrival to departure.':'Một mạch hiểu biết bản địa từ lúc đến tới lúc rời đảo.',
  'Airport timing, vehicles, rooms, boats, restaurants, hosts and changing conditions are easier to manage when the same team understands why each detail matters.':'Giờ bay, xe, phòng, thuyền, nhà hàng, host và điều kiện thay đổi sẽ dễ xử lý hơn khi cùng một đội hiểu vì sao từng chi tiết lại quan trọng.',
  'How we work with travel partners':'Cách JoTrip làm việc với đối tác',
  '02 · PACE':'02 · NHỊP ĐI','Less is sometimes more.':'Ít hơn đôi khi lại tốt hơn.','We edit before we add. A free morning can be more valuable than another stop.':'JoTrip cắt bớt trước khi thêm vào. Một buổi sáng trống đôi khi giá trị hơn một điểm ghé nữa.',
  '03 · CONDITIONS':'03 · ĐIỀU KIỆN','The island gets a vote.':'Hòn đảo cũng có quyền quyết định.','Sea, weather and operating reality can change a plan. Good handling is knowing when to adapt.':'Biển, thời tiết và thực tế vận hành có thể đổi kế hoạch. Làm tốt là biết lúc nào cần thích ứng.',
  '04 · PEOPLE':'04 · CON NGƯỜI','Hosts, not scripts.':'Con người, không phải kịch bản.','The right person can give context a brochure cannot.':'Đúng người có thể cho bạn bối cảnh mà brochure không thể có.',
  '05 · HANDOVERS':'05 · BÀN GIAO','Fewer seams.':'Ít đường nối hơn.','Guests should not feel every supplier change behind their day.':'Khách không cần cảm nhận mỗi lần nhà cung cấp phía sau thay đổi.',
  'Things we notice':'Những điều JoTrip để ý','because we live here.':'vì tụi mình sống ở đây.', 'All notes':'Tất cả ghi chép',
  'Why the best island day is not always the one planned first.':'Vì sao ngày đi đảo hay nhất đôi khi không phải ngày được xếp đầu tiên.',
  'Conditions, timing and the value of leaving room to change.':'Điều kiện, thời điểm và giá trị của việc chừa chỗ để thay đổi.',
  'Multi-generation travel is really a rhythm problem.':'Du lịch nhiều thế hệ thật ra là bài toán về nhịp.',
  'What a fish sauce house can tell you about the island.':'Một nhà thùng nước mắm có thể kể gì về hòn đảo.',
  'FOR TRAVEL PARTNERS':'DÀNH CHO ĐỐI TÁC LỮ HÀNH','You keep the client relationship.':'Bạn giữ quan hệ với khách.','We hold the island.':'JoTrip giữ phần hòn đảo.',
  'For advisors, agencies and DMC partners who need one accountable local team in Phu Quoc - from private FIT to families, groups and complex island days.':'Dành cho cố vấn, agency và DMC cần một đội ngũ bản địa chịu trách nhiệm rõ ràng tại Phú Quốc - từ FIT riêng, gia đình, đoàn cho tới những ngày vận hành phức tạp trên đảo.',
  'Open the partner desk':'Mở bàn đối tác',
  'EXPERIENCES · NOT PACKAGES':'TRẢI NGHIỆM · KHÔNG PHẢI GÓI TOUR','Many ways into':'Nhiều cách bước vào','one island.':'một hòn đảo.',
  'JoTrip does not start with a fixed route. We start with the people, then choose the right mix of water, local life, nature, food and unplanned space.':'JoTrip không bắt đầu bằng một tuyến cố định. Tụi mình bắt đầu từ con người, rồi mới chọn tỷ lệ phù hợp giữa biển, đời sống địa phương, thiên nhiên, ẩm thực và khoảng trống không cần lên lịch.',
  'REAL JOTRIP MOMENT · PHU QUOC':'KHOẢNH KHẮC JOTRIP THẬT · PHÚ QUỐC','Journey shapes':'Dáng hành trình',
  '01 · SEA':'01 · BIỂN','The sea is not':'Biển không phải','a backdrop.':'phông nền.',
  'It decides timing, route, comfort and sometimes whether the original plan should happen at all. Private water days are designed with conditions first, then the guest.':'Biển quyết định giờ đi, tuyến, độ thoải mái và đôi khi quyết định luôn kế hoạch ban đầu có nên diễn ra hay không. Ngày đi biển riêng được thiết kế từ điều kiện thật trước, rồi mới tới khách.',
  'SEA · PRIVATE WATER':'BIỂN · HÀNH TRÌNH RIÊNG','A day that can still change its mind.':'Một ngày vẫn có quyền đổi ý.',
  'Some guests want quiet coves. Some want a long lunch. Some want to fish seriously. Some want to be back before the children run out of energy. A private sea day should be able to respond to all of that.':'Có khách muốn một vịnh yên. Có người muốn bữa trưa thật lâu. Có người đi câu nghiêm túc. Có gia đình cần quay về trước khi trẻ con hết pin. Một ngày đi biển riêng phải đủ linh hoạt cho tất cả những điều đó.',
  'Private boat and crew selection':'Chọn thuyền và ê-kíp riêng','Route shaped around operating conditions':'Tuyến đi theo điều kiện vận hành thật','Family pace and comfort considered':'Tính tới nhịp và độ thoải mái của gia đình','Food, equipment and shore options coordinated':'Phối hợp đồ ăn, thiết bị và phương án lên bờ',
  '02 · ROOTS':'02 · CỘI RỄ','Culture works better when it stays human.':'Văn hóa có ý nghĩa hơn khi vẫn là chuyện của con người.',
  'Fish sauce, pepper, fruit, markets and local tables can become empty stops if nobody explains the people and logic behind them. We prefer fewer places, more context and time to actually notice.':'Nước mắm, tiêu, trái cây, chợ và bàn ăn địa phương có thể thành những điểm ghé rỗng nếu không ai kể con người và logic phía sau. JoTrip thích ít điểm hơn, nhiều bối cảnh hơn và đủ thời gian để thật sự nhận ra điều gì đó.',
  'Fish sauce houses and local producers':'Nhà thùng và người làm nghề địa phương','Pepper, fruit and food stories':'Tiêu, trái cây và câu chuyện ẩm thực','Home-style and carefully chosen tables':'Bàn ăn kiểu nhà và những chỗ được chọn kỹ','Hosts who can translate context, not scripts':'Host biết giải thích bối cảnh, không đọc kịch bản',
  '03 · WILD':'03 · HOANG DÃ','Further out needs better judgement.':'Đi xa hơn cần phán đoán tốt hơn.',
  "Sport fishing, diving and nature-led days depend on equipment, crew, weather, sea and the guest's actual experience. Luxury here is not decoration. It is preparation and the confidence to modify the plan.":'Câu cá thể thao, lặn biển và những ngày thiên nhiên phụ thuộc vào thiết bị, ê-kíp, thời tiết, biển và kinh nghiệm thật của khách. Luxury ở đây không nằm ở trang trí. Nó nằm ở chuẩn bị kỹ và đủ tự tin để đổi kế hoạch.',
  'Big-game and sport fishing':'Câu cá lớn và câu thể thao','Diving and marine experiences':'Lặn và trải nghiệm biển','Nature and conservation-led days':'Ngày thiên nhiên và bảo tồn','Clear go, hold, modify or cancel judgement':'Phán đoán rõ: đi, chờ, đổi hay hủy',
  '04 · MOMENTS':'04 · KHOẢNH KHẮC','The trip belongs to the people in it.':'Chuyến đi thuộc về những người đang ở trong đó.',
  'A celebration, a family holiday or simply one unhurried afternoon should not feel like a production. We plan the hidden pieces so the visible moment stays natural.':'Một dịp kỷ niệm, kỳ nghỉ gia đình hay chỉ một buổi chiều thong thả không nên có cảm giác như một show được dàn dựng. JoTrip lo phần phía sau để khoảnh khắc phía trước vẫn tự nhiên.',
  'Multi-generation family journeys':'Hành trình gia đình nhiều thế hệ','Private meals and celebrations':'Bữa ăn riêng và dịp kỷ niệm','Couples and quiet time':'Cặp đôi và khoảng yên tĩnh','Flexible days with fewer handovers':'Ngày linh hoạt với ít bàn giao hơn',
  'JOURNEY SHAPES':'DÁNG HÀNH TRÌNH','Different people need':'Mỗi nhóm người cần','different structures.':'một cấu trúc khác nhau.',
  'These are not products with fixed inclusions. They are operating shapes JoTrip can compose around the guest, hotel, dates and reason for travelling.':'Đây không phải sản phẩm với hạng mục đóng cứng. Đây là những cấu trúc vận hành JoTrip có thể phối quanh khách, khách sạn, ngày đi và lý do của chuyến đi.',
  'Private island day':'Ngày đảo riêng','One boat, one host and a day shaped around pace, food, sea and the option to change course.':'Một thuyền, một host và một ngày được xếp quanh nhịp, đồ ăn, biển cùng quyền được đổi hướng.',
  'Island roots journey':'Hành trình cội rễ đảo','Producers, food and local stories connected into a meaningful half or full day.':'Người làm nghề, ẩm thực và câu chuyện địa phương được nối thành nửa ngày hoặc một ngày có ý nghĩa.',
  'Fishing day':'Ngày câu cá','Serious fishing logic, equipment and conditions rather than a decorative activity added to a tour.':'Logic câu cá nghiêm túc, thiết bị và điều kiện thật thay vì một hoạt động trang trí gắn thêm vào tour.',
  'Family rhythm':'Nhịp gia đình','Less transfer, more recovery time and choices that work for several generations at once.':'Ít di chuyển hơn, nhiều thời gian hồi phục hơn và lựa chọn phù hợp nhiều thế hệ cùng lúc.',
  'Stay-led journey':'Hành trình xoay quanh nơi ở','The resort is part of the experience, with island days placed around the value of the stay rather than competing with it.':'Resort là một phần của trải nghiệm, các ngày khám phá được đặt quanh giá trị của nơi ở thay vì cạnh tranh với nó.',
  'Something not listed':'Một điều chưa có trong danh sách','Often the best brief is simply a guest telling us what they care about and letting the island answer.':'Nhiều khi brief tốt nhất chỉ là khách kể điều họ quan tâm, rồi để hòn đảo trả lời.',
  'YOUR TRIP':'CHUYẾN ĐI CỦA BẠN','Start with the people travelling.':'Bắt đầu từ những người sẽ đi.', 'Open Journey Paper →':'Mở phiếu hành trình →',
  'READ THE ISLAND':'ĐỌC HÒN ĐẢO','Phu Quoc is':'Phú Quốc là','many islands at once.':'nhiều hòn đảo cùng một lúc.',
  'Beach resort, working sea, village, forest, family holiday and fast-changing destination. Understanding which Phu Quoc matters to a guest is part of the job.':'Resort biển, vùng biển mưu sinh, làng xóm, rừng, kỳ nghỉ gia đình và một điểm đến thay đổi rất nhanh. Hiểu Phú Quốc nào mới quan trọng với từng vị khách là một phần của công việc.',
  'South':'Nam đảo','Center':'Trung tâm','North':'Bắc đảo','Working island':'Đảo đang sống','Island intelligence':'Thông tin hòn đảo',
  'SOUTH · WATER':'NAM ĐẢO · BIỂN','An Thoi and':'An Thới và','the island chain.':'chuỗi đảo nhỏ.',
  'The south is where many sea days begin, but the route is only one part of the decision. Weather, sea state, departure point, boat, guest profile and timing all matter more than the number of stops.':'Nam đảo là nơi nhiều ngày đi biển bắt đầu, nhưng tuyến chỉ là một phần quyết định. Thời tiết, trạng thái biển, điểm xuất phát, thuyền, hồ sơ khách và thời điểm đều quan trọng hơn số lượng điểm dừng.',
  'SOUTH PHU QUOC':'NAM PHÚ QUỐC','Go for the water. Stay flexible about the map.':'Đi vì biển. Nhưng đừng cứng nhắc với bản đồ.',
  'Some of the most beautiful water around Phu Quoc sits off the southern end of the island. It is also where a sensible operator needs to read conditions rather than promise a fixed postcard every day.':'Một số vùng nước đẹp nhất Phú Quốc nằm ở phía nam. Đây cũng là nơi người vận hành có trách nhiệm phải đọc điều kiện thật thay vì hứa mỗi ngày đều giống một tấm bưu thiếp.',
  'An Thoi island chain':'Chuỗi đảo An Thới','Private boat and fishing days':'Ngày đi thuyền riêng và câu cá','Southern resort access':'Kết nối resort phía nam','Sea conditions shape the plan':'Điều kiện biển định hình kế hoạch',
  'CENTRAL PHU QUOC':'TRUNG TÂM PHÚ QUỐC','Where the island still feels lived in.':'Nơi hòn đảo vẫn có cảm giác đang được sống.',
  'Duong Dong is useful precisely because it is not a staged resort environment. Markets, traffic, food, local services and everyday life give a different reading of the island.':'Dương Đông đáng để hiểu chính vì nó không phải môi trường resort được dàn dựng. Chợ, giao thông, đồ ăn, dịch vụ và đời sống thường nhật cho một cách đọc khác về hòn đảo.',
  'Duong Dong and local daily life':'Dương Đông và đời sống thường ngày','Food, markets and town rhythm':'Ẩm thực, chợ và nhịp thị trấn','Easy access to both north and south':'Dễ kết nối cả bắc lẫn nam','Useful when the guest wants context':'Hợp khi khách muốn hiểu bối cảnh',
  'NORTH PHU QUOC':'BẮC PHÚ QUỐC','Resort days can be the point, not the gap.':'Ngày ở resort có thể là mục đích, không phải khoảng trống.',
  'The north can work beautifully for families and resort-led stays. A good program does not drag guests away from an excellent property simply because a schedule needs filling.':'Bắc đảo rất hợp gia đình và kỳ nghỉ xoay quanh resort. Một chương trình tốt không kéo khách ra khỏi một nơi ở tuyệt vời chỉ vì lịch đang còn trống.',
  'Resort-led family stays':'Kỳ nghỉ gia đình xoay quanh resort','Nature and northern attractions':'Thiên nhiên và điểm đến phía bắc','Longer transfer logic considered':'Tính trước logic di chuyển dài hơn','Program built around the value of the stay':'Chương trình xây quanh giá trị của nơi ở',
  'THE WORKING ISLAND':'HÒN ĐẢO ĐANG SỐNG','Look beyond':'Nhìn xa hơn','what was built for visitors.':'những gì được xây cho du khách.',
  'Phu Quoc has industries and habits that predate the current tourism boom. Fish sauce, fishing, pepper, food and local family businesses are not props. They are parts of the island that still work.':'Phú Quốc có nghề và nếp sống tồn tại trước làn sóng du lịch hiện tại rất lâu. Nước mắm, nghề cá, tiêu, ẩm thực và các gia đình làm nghề không phải đạo cụ. Đó là những phần hòn đảo vẫn đang hoạt động.',
  'FISH SAUCE':'NƯỚC MẮM','Time is part of the ingredient.':'Thời gian cũng là một nguyên liệu.',
  'A wooden barrel house makes more sense when you understand that fermentation, anchovies, salt and patient production created an island identity long before beach clubs did.':'Một nhà thùng gỗ sẽ có ý nghĩa hơn khi hiểu rằng cá cơm, muối, quá trình lên men và sự kiên nhẫn đã tạo ra bản sắc đảo từ rất lâu trước các beach club.',
  'The view is also a workplace.':'Phong cảnh cũng là nơi làm việc.','Fishing boats, harbours and crews are reminders that the sea around Phu Quoc is livelihood as well as leisure.':'Tàu cá, cảng và ê-kíp nhắc rằng biển quanh Phú Quốc vừa là sinh kế vừa là nơi nghỉ dưỡng.',
  'FOOD':'ẨM THỰC','A table can explain more than a stop.':'Một bàn ăn có thể kể nhiều hơn một điểm ghé.','Good local food is not about finding the most photographed restaurant. It is about matching taste, timing, comfort and context.':'Đồ ăn địa phương ngon không phải là tìm nhà hàng được chụp nhiều nhất. Đó là sự phù hợp giữa khẩu vị, thời điểm, độ thoải mái và bối cảnh.',
  'The island is easier to understand through someone.':'Hòn đảo dễ hiểu hơn khi có một người dẫn vào.','A driver, host, producer or skipper can connect small observations into a place that feels coherent instead of collected.':'Một tài xế, host, người làm nghề hay skipper có thể nối những quan sát nhỏ thành một nơi chốn có mạch thay vì một bộ sưu tập điểm đến.',
  'PRACTICAL ISLAND INTELLIGENCE':'THÔNG TIN THỰC DỤNG VỀ ĐẢO','Feelings belong here.':'Cảm xúc ở đây.','Facts belong somewhere too.':'Dữ liệu cũng cần đúng chỗ.',
  'JoTrip DMC is where we design and handle the journey. Open Phu Quoc is where practical island information can live without turning this site into a utility dashboard.':'JoTrip DMC là nơi thiết kế và vận hành hành trình. Open Phu Quoc là nơi chứa thông tin thực dụng mà không biến website này thành một bảng tiện ích.',
  'Weather and marine context':'Thời tiết và bối cảnh biển','Use current island intelligence before committing to a sea-heavy day.':'Dùng thông tin hiện tại trước khi chốt một ngày thiên nhiều về biển.',
  'Airport and transit':'Sân bay và giao thông','Useful when arrival timing or onward movement changes the shape of a day.':'Hữu ích khi giờ đến hoặc di chuyển tiếp theo làm đổi cấu trúc một ngày.',
  'Practical island reference':'Tham chiếu thực dụng về đảo','For the information guests need without turning the DMC story into a directory.':'Cho những thông tin khách cần mà không biến câu chuyện DMC thành danh bạ.',
  'PHU QUOC, PERSONALLY':'PHÚ QUỐC, THEO CÁCH CỦA BẠN','Tell us which island you are looking for.':'Kể JoTrip nghe Phú Quốc nào bạn đang tìm.',
  'You hold the client.':'Bạn giữ khách.','JoTrip works as the local operating layer in Phu Quoc for advisors, agencies and DMC partners who need context, continuity and accountable delivery on the ground.':'JoTrip là lớp vận hành bản địa tại Phú Quốc cho cố vấn, agency và DMC cần bối cảnh, sự liên tục và một đầu mối chịu trách nhiệm rõ ràng tại điểm đến.',
  'REAL JOTRIP OPERATIONS · PHU QUOC':'VẬN HÀNH JOTRIP THẬT · PHÚ QUỐC','Scope':'Phạm vi','Workflow':'Quy trình','Guest handling':'Chăm khách','Trade principles':'Nguyên tắc đối tác',
  'LOCAL OPERATING SCOPE':'PHẠM VI VẬN HÀNH BẢN ĐỊA','One team across':'Một đội xuyên suốt','the moving parts.':'các mắt xích đang chuyển động.',
  'We do not need to own every supplier to own the outcome. The role is to coordinate the island around the agreed guest experience and keep context through each handover.':'JoTrip không cần sở hữu mọi nhà cung cấp để chịu trách nhiệm về kết quả. Vai trò là điều phối hòn đảo quanh trải nghiệm đã thống nhất và giữ bối cảnh qua từng lần bàn giao.',
  'Private FIT':'FIT riêng','High-touch arrivals, stays, private days, dining and local hosting shaped around individual guests.':'Đón khách kỹ, kỳ nghỉ, ngày riêng, ăn uống và host bản địa được xếp quanh từng khách cụ thể.',
  'Families':'Gia đình','Multi-generation pacing, vehicle and luggage logic, child-friendly timing and fewer unnecessary movements.':'Nhịp nhiều thế hệ, logic xe và hành lý, giờ phù hợp trẻ nhỏ và bớt những di chuyển không cần thiết.',
  'Groups':'Đoàn','Movement, meal timing, rooming context and operational sequencing for groups that need coordination behind the scenes.':'Di chuyển, giờ ăn, bối cảnh phòng và trình tự vận hành cho đoàn cần điều phối phía sau.',
  'Hotels & villas':'Khách sạn & villa','Local coordination around the stay without treating accommodation as just another line item.':'Điều phối bản địa quanh kỳ nghỉ mà không xem chỗ ở chỉ là một dòng chi phí.',
  'Sea operations':'Vận hành biển','Private boats, fishing and marine days with operating conditions and guest suitability considered before promises.':'Thuyền riêng, câu cá và ngày biển với điều kiện vận hành cùng độ phù hợp của khách được cân nhắc trước khi hứa.',
  'Special moments':'Khoảnh khắc đặc biệt','Private meals, celebrations and tailored requests coordinated discreetly with the people who need to know.':'Bữa ăn riêng, kỷ niệm và yêu cầu đặc biệt được điều phối kín đáo với đúng người cần biết.',
  'PARTNER WORKFLOW':'QUY TRÌNH ĐỐI TÁC','Clear outside.':'Bên ngoài thật gọn.','Busy behind the scenes.':'Phía sau thì luôn có người lo.',
  'Guests should feel continuity, not supplier boundaries. Partners should know who is responsible, what is confirmed and where the plan still needs judgement.':'Khách nên cảm nhận một mạch xuyên suốt, không phải ranh giới nhà cung cấp. Đối tác phải biết ai chịu trách nhiệm, điều gì đã xác nhận và phần nào vẫn cần phán đoán.',
  'Brief':'Brief','We start with the traveller profile, priorities, hotel, dates, pace and anything that could change the handling.':'Bắt đầu từ hồ sơ khách, ưu tiên, khách sạn, ngày đi, nhịp và mọi thứ có thể làm thay đổi cách vận hành.',
  'Shape':'Định hình','We propose the right operating structure before filling it with unnecessary activities.':'Đề xuất cấu trúc vận hành đúng trước khi nhồi thêm hoạt động không cần thiết.',
  'Confirm':'Xác nhận','Key suppliers, timing, guest notes and dependencies are checked before arrival.':'Nhà cung cấp chính, giờ, ghi chú khách và các phụ thuộc được kiểm trước khi khách đến.',
  'Operate':'Vận hành','A local team keeps context across arrival, movement and experience delivery.':'Một đội bản địa giữ bối cảnh xuyên suốt đón khách, di chuyển và trải nghiệm.',
  'Adapt':'Thích ứng','When conditions change, we explain options and modify rather than forcing the original plan.':'Khi điều kiện đổi, JoTrip đưa lựa chọn và điều chỉnh thay vì ép kế hoạch ban đầu.',
  'GUEST HANDLING':'CHĂM KHÁCH','Local does not mean casual.':'Bản địa không có nghĩa là xuề xòa.',
  'Warmth and operational discipline should coexist. The guest can feel relaxed because the people behind the day are paying attention to the details that matter.':'Sự ấm áp và kỷ luật vận hành phải đi cùng nhau. Khách có thể thư giãn vì phía sau luôn có người để ý những chi tiết quan trọng.',
  'Clear named local responsibility':'Đầu mối bản địa rõ người chịu trách nhiệm','Guest preferences passed through handovers':'Sở thích khách được giữ xuyên các lần bàn giao','Timing and movement checked against reality':'Giờ và di chuyển được đối chiếu với thực tế','Plan changes explained with useful options':'Thay đổi kế hoạch được giải thích kèm lựa chọn hữu ích','No invented certainty when conditions are unclear':'Không tạo cảm giác chắc chắn giả khi điều kiện chưa rõ',
  'TRADE PRINCIPLES':'NGUYÊN TẮC ĐỐI TÁC','Good partnerships need':'Hợp tác tốt cần','clean boundaries.':'ranh giới rõ ràng.',
  'JoTrip can operate behind the partner relationship. The client remains yours, the local responsibility remains clear, and commercial details stay where they belong.':'JoTrip có thể vận hành phía sau mối quan hệ của đối tác. Khách vẫn là khách của bạn, trách nhiệm bản địa vẫn rõ và thông tin thương mại ở đúng nơi của nó.',
  'Partner-first communication':'Giao tiếp ưu tiên đối tác','We do not compete for the relationship a travel advisor has built with their client.':'JoTrip không cạnh tranh mối quan hệ mà cố vấn đã xây với khách.',
  'Private commercial data':'Dữ liệu thương mại riêng tư','Net rates, supplier terms and internal margins do not become public marketing content.':'Net rate, điều khoản nhà cung cấp và biên nội bộ không trở thành nội dung marketing công khai.',
  'Evidence before promises':'Bằng chứng trước lời hứa','We prefer verified operating information over selling certainty that the island may not support.':'JoTrip ưu tiên thông tin vận hành đã kiểm hơn việc bán một sự chắc chắn mà hòn đảo có thể không đáp ứng.',
  'One accountable local team':'Một đội bản địa chịu trách nhiệm','A partner should know where to call when the day changes.':'Đối tác phải biết gọi ai khi một ngày thay đổi.',
  'Context carried forward':'Bối cảnh được giữ xuyên suốt','Guest notes should not disappear every time a new supplier enters the day.':'Ghi chú khách không được biến mất mỗi lần có nhà cung cấp mới tham gia.',
  'Quiet delivery':'Vận hành kín đáo','The operation can be complex without making the guest experience feel complicated.':'Vận hành có thể phức tạp mà trải nghiệm của khách vẫn nhẹ nhàng.',
  'PARTNER DESK':'BÀN ĐỐI TÁC','Bring us the brief. We will start with the island.':'Đưa JoTrip brief. Tụi mình bắt đầu từ hòn đảo.',
  'Not travel content for its own sake. Short observations from operating journeys in Phu Quoc - about pace, weather, families, food, people and the decisions between the obvious highlights.':'Không viết nội dung du lịch chỉ để có nội dung. Đây là những quan sát ngắn từ việc vận hành hành trình ở Phú Quốc - về nhịp, thời tiết, gia đình, đồ ăn, con người và những quyết định nằm giữa các điểm nổi bật.',
  'Sea & timing':'Biển & thời điểm','Island roots':'Cội rễ đảo','Arrival':'Đến đảo',
  'NOTE 01 · SEA & TIMING':'GHI CHÉP 01 · BIỂN & THỜI ĐIỂM','The best sea day':'Ngày đi biển tốt nhất','may not be the first plan.':'có thể không phải kế hoạch đầu tiên.',
  'Island itineraries often look fixed on paper because fixed plans are easier to sell. The sea does not care. A good local operator needs a plan, alternatives and the confidence to change the order when reality says so.':'Lịch trình đảo thường trông rất cố định trên giấy vì kế hoạch cố định dễ bán hơn. Biển không quan tâm chuyện đó. Người vận hành tốt cần có kế hoạch, phương án thay thế và đủ tự tin đổi thứ tự khi thực tế lên tiếng.',
  'OPERATING NOTE':'GHI CHÚ VẬN HÀNH','Flexibility is not the absence of planning.':'Linh hoạt không có nghĩa là thiếu kế hoạch.',
  'It is the result of having more than one sensible plan. The right question is not only “Where are we going?” but “What kind of day will this group actually have if we go there now?”':'Nó là kết quả của việc có hơn một phương án hợp lý. Câu hỏi đúng không chỉ là “Mình đi đâu?” mà còn là “Nếu đi lúc này, nhóm khách này thật sự sẽ có một ngày như thế nào?”',
  'Sea state can matter more than the forecast icon':'Trạng thái biển đôi khi quan trọng hơn icon dự báo','Children and older guests change tolerance for rough water':'Trẻ nhỏ và người lớn tuổi làm thay đổi ngưỡng chịu sóng','Departure time can improve both comfort and atmosphere':'Giờ khởi hành có thể cải thiện cả độ thoải mái lẫn không khí','A shorter day can sometimes be the better luxury':'Một ngày ngắn hơn đôi khi mới là lựa chọn luxury tốt hơn',
  'NOTE 02 · FAMILY RHYTHM':'GHI CHÉP 02 · NHỊP GIA ĐÌNH','One family can contain several different holidays at the same time. Children need movement. Grandparents may need comfort and shorter transfers. Adults may want one proper meal and an hour with no agenda.':'Một gia đình có thể chứa nhiều kỳ nghỉ khác nhau cùng lúc. Trẻ con cần vận động. Ông bà cần thoải mái và ít di chuyển. Người lớn có thể chỉ cần một bữa ăn tử tế và một giờ không có lịch.',
  'Choose fewer hard transitions':'Giảm những lần chuyển cảnh mệt mỏi','Keep recovery time around long-haul arrivals':'Chừa thời gian hồi phục sau hành trình dài','Build optionality into shared days':'Để lựa chọn mở trong những ngày đi chung','Do not confuse activity density with value':'Đừng nhầm mật độ hoạt động với giá trị',
  'NOTE 03 · ISLAND ROOTS':'GHI CHÉP 03 · CỘI RỄ ĐẢO','A fish sauce house is not a photo stop.':'Nhà thùng nước mắm không phải điểm chụp hình.',
  "The barrels are interesting because of the system behind them - fish, salt, time, weather, labour and a tradition linked to the island's working life. Without that context, even a distinctive place becomes another backdrop.":'Những thùng gỗ thú vị vì cả hệ thống phía sau - cá, muối, thời gian, thời tiết, lao động và một truyền thống gắn với đời sống mưu sinh của đảo. Không có bối cảnh đó, nơi đặc biệt tới đâu cũng chỉ thành phông nền.',
  'Context before checklist':'Bối cảnh trước checklist','People before props':'Con người trước đạo cụ','Time to ask rather than time to pose':'Thời gian để hỏi thay vì chỉ tạo dáng','Food culture is part of island history':'Văn hóa ẩm thực là một phần lịch sử đảo',
  'NOTE 04 · ARRIVAL':'GHI CHÉP 04 · ĐẾN ĐẢO','The first hour can decide the rest of the day.':'Một giờ đầu có thể quyết định phần còn lại của ngày.',
  'A long flight, luggage, a child who has stopped cooperating, a room not yet ready or a transfer that takes longer than expected can change the emotional start of a holiday. Good arrival handling is not decorative service. It protects the rest of the trip.':'Một chuyến bay dài, hành lý, một đứa trẻ đã hết hợp tác, phòng chưa sẵn sàng hay chuyến xe lâu hơn dự kiến đều có thể đổi cảm xúc mở đầu kỳ nghỉ. Đón khách tốt không phải dịch vụ trang trí. Nó bảo vệ phần còn lại của chuyến đi.',
  'Know the real arrival context':'Biết đúng bối cảnh lúc khách đến','Do not stack too much onto day one':'Đừng nhồi quá nhiều vào ngày đầu','Keep food and transfer timing practical':'Giữ giờ ăn và di chuyển thực tế','Let the guest arrive before asking them to perform the itinerary':'Để khách thật sự đến nơi trước khi bắt họ chạy lịch trình',
  'FROM NOTES TO A JOURNEY':'TỪ GHI CHÉP ĐẾN HÀNH TRÌNH','Tell us what matters to your group.':'Kể JoTrip nghe điều gì quan trọng với nhóm của bạn.',
  'ABOUT JOTRIP':'VỀ JOTRIP','We work where':'Tụi mình làm nghề ở nơi','we live.':'tụi mình đang sống.',
  'JoTrip began from doing the work in Phu Quoc - meeting guests, moving people, solving island problems and learning what makes a journey feel looked after rather than processed.':'JoTrip bắt đầu từ việc làm nghề ở Phú Quốc - đón khách, đưa người đi, xử lý những vấn đề của đảo và học xem điều gì khiến một chuyến đi có cảm giác được chăm sóc thay vì bị xử lý như một quy trình.',
  'JOTRIP · PHU QUOC':'JOTRIP · PHÚ QUỐC','Origin':'Khởi đầu','What we believe':'Điều JoTrip tin','How care shows up':'Sự chăm sóc thể hiện ra sao','JoTrip today':'JoTrip hôm nay',
  'ORIGIN':'KHỞI ĐẦU','Before a brand,':'Trước khi thành thương hiệu,','there was the work.':'đã có công việc.',
  'Airport meetings, boats, drivers, meals, families, groups and the small things that can go wrong on an island taught us more than a positioning statement ever could.':'Đón sân bay, thuyền, tài xế, bữa ăn, gia đình, đoàn và những chuyện nhỏ có thể trục trặc trên một hòn đảo dạy JoTrip nhiều hơn bất kỳ tuyên ngôn định vị nào.',
  'FROM PHU QUOC LUX TO JOTRIP DMC':'TỪ PHU QUOC LUX ĐẾN JOTRIP DMC','The name changed. The place did not.':'Tên đã đổi. Nơi làm nghề thì không.',
  'The work grew from local travel operations into a more deliberate DMC model, but the basic idea stayed simple: know the island, know the guest and take responsibility for the gap between the two.':'Công việc lớn lên từ vận hành du lịch bản địa thành một mô hình DMC rõ ràng hơn, nhưng ý cốt lõi vẫn đơn giản: hiểu đảo, hiểu khách và chịu trách nhiệm cho khoảng cách giữa hai điều đó.',
  'Built from local operations':'Xây từ vận hành bản địa','Phu Quoc remains the focus':'Phú Quốc vẫn là trọng tâm','Private and bespoke work over generic expansion':'Ưu tiên private và bespoke hơn mở rộng đại trà','Local knowledge paired with operating discipline':'Kiến thức bản địa đi cùng kỷ luật vận hành',
  'WHAT WE BELIEVE':'ĐIỀU JOTRIP TIN','Luxury is not':'Luxury không phải','more things.':'nhiều thứ hơn.',
  'It is fewer unnecessary decisions reaching the guest. It is a day that feels natural because somebody else has thought through the joins.':'Đó là khi ít quyết định không cần thiết chạm tới khách hơn. Là một ngày có cảm giác tự nhiên vì đã có người nghĩ kỹ các đường nối phía sau.',
  'Listen before adding':'Nghe trước khi thêm','The best itinerary is not the longest one.':'Lịch trình tốt nhất không phải lịch dài nhất.',
  'Local knowledge needs judgement':'Kiến thức bản địa cần phán đoán','Knowing a road or a boat is useful. Knowing when it is the right choice is the real value.':'Biết một con đường hay một chiếc thuyền là hữu ích. Biết khi nào nó là lựa chọn đúng mới là giá trị thật.',
  'Conditions are part of the design':'Điều kiện là một phần thiết kế','On an island, weather and sea are not operational footnotes.':'Trên đảo, thời tiết và biển không phải ghi chú nhỏ của vận hành.',
  'Care should feel calm':'Sự chăm sóc nên tạo cảm giác bình thản','The guest does not need to see every moving part behind a smooth day.':'Khách không cần nhìn thấy mọi bộ phận đang chạy phía sau một ngày trơn tru.',
  'CARE, IN PRACTICE':'SỰ CHĂM SÓC, TRONG THỰC TẾ','Small decisions are':'Những quyết định nhỏ mới là','the actual product.':'sản phẩm thật sự.',
  'Changing a departure time, picking a different vehicle, shortening a route, holding back one more activity, choosing the right host or simply telling a guest the truth about conditions - these are the things that shape trust.':'Đổi giờ xuất phát, chọn xe khác, rút ngắn tuyến, bỏ bớt một hoạt động, chọn đúng host hay đơn giản là nói thật với khách về điều kiện - đó mới là những thứ tạo nên niềm tin.',
  'Meet the journey before it starts.':'Đón hành trình trước khi nó bắt đầu.','A delayed flight, luggage, a tired child or a long transfer can change the energy of the whole day. Arrival handling is part of the experience.':'Chuyến bay trễ, hành lý, trẻ nhỏ mệt hay một chuyến xe dài có thể đổi năng lượng của cả ngày. Đón khách là một phần trải nghiệm.',
  'Leave room for the island.':'Chừa chỗ cho hòn đảo.','Guests do not travel to Phu Quoc to feel rushed between things they were told they should do.':'Khách không tới Phú Quốc để vội vàng chạy giữa những thứ người khác bảo họ nên làm.',
  'The right person changes the meaning.':'Đúng người sẽ đổi ý nghĩa của một nơi.','A host, driver or producer can turn a place from something seen into something understood.':'Một host, tài xế hay người làm nghề có thể biến một nơi từ thứ được nhìn thấy thành thứ được hiểu.',
  'Everyone is travelling at a different speed.':'Mỗi người đang đi ở một tốc độ khác nhau.','Children, grandparents and adults can share a journey without sharing the same energy level all day.':'Trẻ nhỏ, ông bà và người lớn có thể cùng một hành trình mà không cần cùng mức năng lượng cả ngày.',
  'JOTRIP TODAY':'JOTRIP HÔM NAY','A local DMC, intentionally focused.':'Một DMC bản địa, cố tình giữ trọng tâm.',
  'JoTrip serves private travellers and travel partners who need Phu Quoc handled with more context than a standard tour operator model usually allows.':'JoTrip phục vụ khách private và đối tác lữ hành cần Phú Quốc được xử lý với nhiều bối cảnh hơn mô hình tour operator thông thường.',
  'Private island journeys':'Hành trình đảo riêng','Luxury and resort-led stays':'Kỳ nghỉ luxury và xoay quanh resort','Marine, fishing and local experiences':'Biển, câu cá và trải nghiệm địa phương','Family and group handling':'Chăm gia đình và đoàn','Travel partner support on the ground':'Hỗ trợ đối tác ngay tại điểm đến',
  'TRAVEL, MADE PERSONAL.':'MỖI CHUYẾN ĐI, MỘT CÂU CHUYỆN RIÊNG.','The next story should still feel like yours.':'Câu chuyện tiếp theo vẫn nên có cảm giác là của bạn.'
};

export function getLanguage(){
  const saved = localStorage.getItem('jotrip-lang');
  if (saved === 'vi' || saved === 'en') return saved;
  return (navigator.language || '').toLowerCase().startsWith('vi') ? 'vi' : 'en';
}

export function setLanguagePreference(lang){ localStorage.setItem('jotrip-lang', lang === 'vi' ? 'vi' : 'en'); }

export function translateStaticText(root, lang){
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node){
      const p = node.parentElement;
      if (!p || ['SCRIPT','STYLE','TEXTAREA','INPUT','OPTION'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
  for(const node of nodes){
    if(!originals.has(node)) originals.set(node,node.nodeValue);
    const original=originals.get(node);
    if(lang==='en'){ node.nodeValue=original; continue; }
    const trimmed=original.trim();
    const translated=vi[trimmed];
    if(!translated) continue;
    const lead=original.match(/^\s*/)?.[0]||'';
    const tail=original.match(/\s*$/)?.[0]||'';
    node.nodeValue=lead+translated+tail;
  }
  document.documentElement.lang=lang;
}

export function t(lang,key){ return messages[lang]?.[key] ?? messages.en[key] ?? key; }

export function getDynamicCopy(lang){
  const en={
    fieldNotes:['Some days are better when the itinerary has room to change.','The right host can change how a place is understood.','On an island, logistics and atmosphere are often the same conversation.','A beautiful journey is often the result of details the guest never sees.'],
    filmCaptions:['OUT ON THE WATER','THE WORKING ISLAND','READING PHU QUOC'],
    atlas:{
      sea:{title:'Sea, without forcing the day.',body:'Boat, route and timing are shaped around the group and real conditions. The point is not to collect islands. It is to make the day feel right.',label:'Explore Sea'},
      roots:{title:'Roots, with the story left intact.',body:'Fish sauce, local food and island craft become meaningful when somebody explains why they matter, instead of turning them into another stop on a route.',label:'Explore Roots'},
      wild:{title:'Wild, with purpose and judgement.',body:'Fishing, diving and further-water days need more than a pretty plan. Conditions, equipment, crew and the guest all have to agree.',label:'Explore Wild'},
      moments:{title:'Moments, built around the people.',body:'A family day, a private meal or a celebration works when the pace fits the people in front of us, not an idea of what luxury should look like.',label:'Explore Moments'}
    }
  };
  const viCopy={
    fieldNotes:['Có những ngày đẹp hơn khi lịch trình còn chừa chỗ để thay đổi.','Đúng host có thể thay đổi cách một nơi được hiểu.','Trên đảo, logistics và không khí nhiều khi là cùng một câu chuyện.','Một hành trình đẹp thường là kết quả của những chi tiết khách không cần phải nhìn thấy.'],
    filmCaptions:['TRÊN MẶT BIỂN','HÒN ĐẢO ĐANG SỐNG','ĐỌC PHÚ QUỐC'],
    atlas:{
      sea:{title:'Biển, không ép ngày đi theo kế hoạch.',body:'Thuyền, tuyến và thời gian được chọn quanh nhóm khách và điều kiện thật. Mục tiêu không phải sưu tầm thật nhiều đảo, mà là để ngày hôm đó vừa vặn.',label:'Xem Biển'},
      roots:{title:'Cội rễ, giữ nguyên câu chuyện.',body:'Nước mắm, món ăn và nghề trên đảo có ý nghĩa khi có người giải thích vì sao chúng quan trọng, thay vì biến thành thêm một điểm dừng.',label:'Xem Cội rễ'},
      wild:{title:'Hoang dã, nhưng phải có mục đích và phán đoán.',body:'Câu cá, lặn và những ngày đi xa cần nhiều hơn một kế hoạch đẹp. Điều kiện, thiết bị, ê-kíp và khách phải cùng đồng ý.',label:'Xem Hoang dã'},
      moments:{title:'Khoảnh khắc, được xây quanh con người.',body:'Một ngày gia đình, bữa ăn riêng hay dịp kỷ niệm sẽ đẹp khi nhịp hợp với người đang ở trước mặt, không phải với một khuôn mẫu luxury.',label:'Xem Khoảnh khắc'}
    }
  };
  return lang==='vi'?viCopy:en;
}
