import {translateStaticText} from '/i18n.js';

const saved=localStorage.getItem('jotrip-lang');
const lang=saved==='vi'||saved==='en'?saved:((navigator.language||'').toLowerCase().startsWith('vi')?'vi':'en');

// app.js translates the original <main>. The editorial/story/proof/photo/contact layers are
// injected afterwards, so run one final pass over the complete DOM once every layer exists.
translateStaticText(document.body,lang);
document.documentElement.lang=lang;

if(lang==='vi'){
  const exact=new Map([
    ['PHU QUOC · VIETNAM','PHÚ QUỐC · VIỆT NAM'],
    ['JOTRIP DMC · PHU QUOC · VIETNAM','JOTRIP DMC · PHÚ QUỐC · VIỆT NAM'],
    ['JOURNEY PAPER · PHU QUOC','PHIẾU HÀNH TRÌNH · PHÚ QUỐC'],
    ['JoTrip DMC · Phu Quoc, Vietnam','JoTrip DMC · Phú Quốc, Việt Nam'],
    ['FIELD NOTES','GHI CHÉP ĐẢO'],
    ['JOTRIP FIELD NOTES · PHU QUOC','GHI CHÉP JOTRIP · PHÚ QUỐC'],
    ['ISLAND DESK','GHI CHÉP TỪ ĐẢO'],
    ['PRIVATE ISLAND DAY','NGÀY ĐI ĐẢO RIÊNG'],
    ['BIG-GAME FISHING','CÂU CÁ LỚN'],
    ['ISLAND ROOTS JOURNEY','HÀNH TRÌNH CỘI RỄ ĐẢO'],
    ['CONSERVATION-LED DAY','NGÀY THIÊN NHIÊN & BẢO TỒN'],
    ['FAMILY RHYTHM','NHỊP GIA ĐÌNH'],
    ['STAY-LED JOURNEY','HÀNH TRÌNH XOAY QUANH NƠI Ở'],
    ['SEA · PRIVATE','BIỂN · RIÊNG'],
    ['FISHING · AN THOI','CÂU CÁ · AN THỚI'],
    ['ROOTS · LOCAL','CỘI RỄ · BẢN ĐỊA'],
    ['NATURE · PURPOSE','THIÊN NHIÊN · CÓ CHỦ ĐÍCH'],
    ['FAMILY · BESPOKE','GIA ĐÌNH · THIẾT KẾ RIÊNG'],
    ['RESORT · QUIET LUXURY','NƠI Ở · SANG TRỌNG KÍN ĐÁO'],
    ['MARINE OPERATIONS','VẬN HÀNH BIỂN'],
    ['TRANSFER LOGIC','NHỊP DI CHUYỂN'],
    ['STAY-LED DESIGN','THIẾT KẾ XOAY QUANH NƠI Ở'],
    ['LOCAL CONTEXT','BỐI CẢNH BẢN ĐỊA'],
    ['SEA','BIỂN'],
    ['STAY + SEA','NƠI Ở + BIỂN'],
    ['ROOTS','CỘI RỄ'],
    ['LOCAL LIFE','ĐỜI SỐNG BẢN ĐỊA'],
    ['LOCAL TEAM','ĐỘI NGŨ BẢN ĐỊA'],
    ['ON THE WATER','TRÊN BIỂN'],
    ['THE TABLE','BÀN ĂN'],
    ['THE STAY','NƠI Ở'],
    ['Destination intelligence không phải dashboard. Nó là thứ giúp quyết định đúng hơn.','Lớp hiểu biết điểm đến không phải bảng điều khiển. Nó giúp JoTrip đưa ra quyết định đúng hơn.'],
    ['Chuyến bay · transit · thời gian xe','Chuyến bay · tàu xe · thời gian di chuyển'],
    ['Host · thuyền trưởng · người làm nghề','Người dẫn · thuyền trưởng · người làm nghề'],
    ['Một nơi ở tốt đáng được sử dụng đúng giá trị.','Một nơi ở tốt đáng được tận hưởng đúng giá trị.'],
    ['Nếu khách chọn một resort rất tốt vì bãi biển, villa, kids club hay dining, kéo họ ra ngoài cả ngày chỉ để lịch dày hơn là một quyết định kém.','Nếu khách chọn một resort rất tốt vì bãi biển, villa, khu vui chơi trẻ em hay ẩm thực, kéo họ ra ngoài cả ngày chỉ để lịch dày hơn là một quyết định kém.'],
    ['Không phải package. Là những việc JoTrip thật sự làm sâu.','Không phải những gói có sẵn. Là những việc JoTrip thật sự làm sâu.'],
    ['Một cano riêng, một host riêng, một ngày biết đổi nhịp.','Một cano riêng, một người dẫn riêng, một ngày biết đổi nhịp.'],
    ['Không kéo khách khỏi một nơi ở rất tốt chỉ để bán thêm activity.','Không kéo khách khỏi một nơi ở rất tốt chỉ để bán thêm hoạt động.'],
    ['Resort có thể là một phần quan trọng của trải nghiệm.','Nơi ở có thể là một phần quan trọng của trải nghiệm.'],
    ['Nhịp của người thật quan trọng hơn nhịp của brochure.','Nhịp của người thật quan trọng hơn nhịp của tờ giới thiệu.'],
    ['Một DMC tốt phải nói rõ điều mình biết, điều đang kiểm tra và lựa chọn thay thế.','Một DMC tốt phải nói rõ điều mình biết, điều đang kiểm tra và phương án thay thế.'],
    ['Đôi khi quyết định DMC tốt nhất là giữ lại một buổi sáng chậm, tận dụng chính nơi khách đã chọn ở và đặt các ngày khám phá quanh kỳ nghỉ thay vì cạnh tranh với nó.','Đôi khi quyết định DMC tốt nhất là giữ lại một buổi sáng chậm, tận hưởng đúng nơi khách đã chọn ở và đặt các ngày khám phá quanh kỳ nghỉ thay vì cạnh tranh với nó.'],
    ['Một thuyền trưởng, tài xế, host, người làm nghề hay đội nhà hàng có thể biến logistics thành cảm giác về nơi chốn khi đúng người gặp đúng khách.','Một thuyền trưởng, tài xế, người dẫn, người làm nghề hay đội nhà hàng có thể biến phần vận hành thành cảm giác về nơi chốn khi đúng người gặp đúng khách.'],
    ['Một DMC không chỉ cần biết mọi thứ nằm ở đâu. Cần hiểu vì sao hai nơi đều hay nhưng không nên ghép trong cùng một ngày, vì sao cùng một tuyến biển ngày mai có thể khác hôm nay, và vì sao khách ở bắc đảo không thể được xếp lịch giống khách thức dậy ở nam đảo.','Một DMC không chỉ cần biết mọi thứ nằm ở đâu. Cần hiểu vì sao hai nơi đều hay nhưng không nên ghép trong cùng một ngày, vì sao cùng một tuyến biển ngày mai có thể khác hôm nay, và vì sao khách ở bắc đảo không thể được xếp lịch giống khách thức dậy ở nam đảo.'],
    ['Destination intelligence là một phần của vận hành','Hiểu biết điểm đến là một phần của vận hành']
  ]);

  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{
    acceptNode(node){
      const p=node.parentElement;
      if(!p||['SCRIPT','STYLE','TEXTAREA','INPUT','OPTION'].includes(p.tagName))return NodeFilter.FILTER_REJECT;
      return node.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }
  });
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){
    const original=node.nodeValue;
    const trimmed=original.trim();
    let replacement=exact.get(trimmed);
    if(!replacement&&/[À-ỹ]/.test(trimmed)){
      replacement=trimmed
        .replace(/\bkids club\b/gi,'khu vui chơi trẻ em')
        .replace(/\bdining\b/gi,'ẩm thực')
        .replace(/\bdashboard\b/gi,'bảng điều khiển')
        .replace(/\btransit\b/gi,'tàu xe')
        .replace(/\bactivity\b/gi,'hoạt động')
        .replace(/\bactivities\b/gi,'hoạt động')
        .replace(/\bbespoke\b/gi,'thiết kế riêng')
        .replace(/\bpackage\b/gi,'gói')
        .replace(/\bbrochure\b/gi,'tờ giới thiệu')
        .replace(/\blogistics\b/gi,'vận hành')
        .replace(/\bhost\b/gi,'người dẫn')
        .replace(/\bluxury\b/gi,'cao cấp');
      if(replacement===trimmed)replacement=null;
    }
    if(replacement){
      const lead=original.match(/^\s*/)?.[0]||'';
      const tail=original.match(/\s*$/)?.[0]||'';
      node.nodeValue=lead+replacement+tail;
    }
  }

  const attrs=new Map([
    ['JoTrip DMC home','Trang chủ JoTrip DMC'],
    ['Primary navigation','Điều hướng chính'],
    ['Language','Ngôn ngữ'],
    ['Open navigation','Mở menu'],
    ['Mobile navigation','Điều hướng di động'],
    ['Footer navigation','Điều hướng cuối trang'],
    ['Journey paper','Phiếu hành trình'],
    ['Experience chapters','Các phần Trải nghiệm'],
    ['Phu Quoc chapters','Các phần Phú Quốc'],
    ['Partner chapters','Các phần dành cho đối tác'],
    ['Field notes','Ghi chép đảo'],
    ['About chapters','Các phần Về JoTrip'],
    ['Photo rail controls','Điều khiển dải ảnh'],
    ['Previous photos','Ảnh trước'],
    ['Next photos','Ảnh tiếp theo'],
    ['Real JoTrip moments','Khoảnh khắc thật của JoTrip'],
    ['Real Phu Quoc photography','Ảnh thật Phú Quốc'],
    ['Explore Phu Quoc with JoTrip','Khám phá Phú Quốc cùng JoTrip'],
    ['Sea · Bãi Sao','Biển · Bãi Sao'],
    ['Stay + Sea · Bãi Khem','Nơi ở + Biển · Bãi Khem'],
    ['Roots · Nhà thùng','Cội rễ · Nhà thùng'],
    ['Local life · Phú Quốc','Đời sống bản địa · Phú Quốc']
  ]);
  document.querySelectorAll('[aria-label]').forEach(el=>{
    const value=el.getAttribute('aria-label');
    if(attrs.has(value))el.setAttribute('aria-label',attrs.get(value));
  });

  const description=document.querySelector('meta[name="description"]');
  if(description)description.setAttribute('content','JoTrip DMC - đội ngũ bản địa tại Phú Quốc, thiết kế và vận hành những hành trình riêng quanh con người, nơi ở và điều kiện thật của hòn đảo.');
}
