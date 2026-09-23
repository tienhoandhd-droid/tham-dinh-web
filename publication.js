(() => {
  'use strict';
  const gasForms = [
    ['bm01', 'Tiểu phân', 'Ghi kết quả tiểu phân tại từng điểm lấy mẫu.'],
    ['bm02', 'Điểm sương', 'Ghi nhiệt độ điểm sương và thông tin thực hiện phép đo.'],
    ['bm03', 'Vết dầu', 'Ghi lưu lượng, thời gian lấy mẫu và giá trị đọc để tính kết quả vết dầu.'],
    ['bm04', 'Vi sinh', 'Ghi kết quả vi sinh, chứng dương và thông tin môi trường.'],
  ];
  const summary = ['Tổng hợp đánh giá', 'Tổng hợp kết quả các chỉ tiêu, nhận xét và thông tin báo cáo.'];
  const trend = ['Phân tích xu hướng', 'Ghi nội dung phân tích theo hướng dẫn nghiệp vụ. Phương pháp tính giới hạn cần được xác định từ SOP.'];
  const systems = {
    steam: {title: 'Hơi tinh khiết', route: './steam.html', forms: [
      ['bm01', 'Khí không ngưng tụ', 'Ghi thể tích khí và nước thu được qua các lần đo.'],
      ['bm02', 'Chất lượng nước ngưng', 'Ghi kết quả hóa lý, vi sinh và nội độc tố theo phạm vi lấy mẫu.'],
      ['bm03', 'Độ khô', 'Ghi khối lượng và nhiệt độ qua các lần đo để tính độ khô của hơi.'],
      ['bm04', 'Quá nhiệt', 'Ghi nhiệt độ đo và sử dụng dữ liệu liên quan từ phép thử độ khô.'],
      ['bm05', ...summary],
    ]},
    air: {title: 'Khí nén', route: './gas.html?system=air', forms: [...gasForms, ['bm05', ...summary], ['bm06', ...trend]]},
    nitrogen: {title: 'Khí nitơ', route: './gas.html?system=nitrogen', forms: [...gasForms, ['bm05', 'Độ tinh khiết', 'Ghi độ tinh khiết nitơ tại từng điểm lấy mẫu.'], ['bm06', ...summary], ['bm07', ...trend]]},
  };
  if (!document.body.hasAttribute('data-publication-module')) {
    return;
  }
  const query = new URLSearchParams(location.search);
  const key = location.pathname.endsWith('/steam.html') ? 'steam' : query.get('system') === 'nitrogen' ? 'nitrogen' : 'air';
  const system = systems[key];
  const selected = system.forms.find(form => form[0] === query.get('form')) || system.forms[0];
  document.title = `Thẩm định | ${system.title}`;
  document.getElementById('publication-system').textContent = system.title;
  document.getElementById('publication-code').textContent = selected[0].toUpperCase();
  document.getElementById('publication-title').textContent = selected[1];
  document.getElementById('publication-description').textContent = selected[2];
  for (const [id, title] of system.forms) {
    const link = document.createElement('a');
    link.href = `${system.route}${system.route.includes('?') ? '&' : '?'}form=${id}`;
    const code = document.createElement('span');
    code.textContent = id.toUpperCase();
    link.append(code, document.createTextNode(title));
    if (id === selected[0]) link.setAttribute('aria-current', 'page');
    document.getElementById('publication-forms').append(link);
  }
  document.querySelector(`[data-system="${key}"]`)?.setAttribute('aria-current', 'page');
  if (query.get('view') === 'records') {
    document.getElementById('publication-code').textContent = 'HỒ SƠ';
    document.getElementById('publication-title').textContent = 'Hồ sơ đã lưu';
    document.getElementById('publication-description').textContent = 'Danh sách hồ sơ sẽ có sau khi kết nối kho dữ liệu và đăng nhập bằng tài khoản được cấp.';
    document.querySelectorAll('#publication-forms [aria-current]').forEach(link => link.removeAttribute('aria-current'));
  }
})();
