const input = $json;
const results = [];

const ten_loai = input.ten_loai || [];
const gia_vung_1 = input.gia_vung_1 || [];

for (let i = 0; i < ten_loai.length; i++) {
  
  if (ten_loai[i] && gia_vung_1[i]) {
    
    let cleanName = ten_loai[i].split('[')[0].trim();
    
    if (cleanName !== "USD" && cleanName !== "EUR" && cleanName !== "GBP" && !cleanName.includes("Đơn vị")) {
      results.push({
        ten: cleanName,
        gia: gia_vung_1[i].trim()
      });
    }
  }
}

const ron95 = results.find(item => item.ten.includes('RON 95-III'));

return ron95 ? ron95 : results;