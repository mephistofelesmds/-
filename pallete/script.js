const colorPreview = document.getElementById('colorPreview');
const input = document.getElementById('colorInput');
const picker = document.getElementById('colorPicker');
const randomBtn = document.getElementById('randomBtn');
const palettesContainer = document.getElementById('palettes');

function randomHex() {
  const letters = '0123456789ABCDEF';
  let hex = '#';
  for (let i = 0; i < 6; i++) {
    hex += letters[Math.floor(Math.random() * 16)];
  }
  return hex;
}

function showToast(hex) {
  const old = document.querySelector('.toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = hex + ' copied!';
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 1500);
}

function copyToClipboard(hex) {
  navigator.clipboard.writeText(hex).then(() => showToast(hex));
}

// Все палитры, которые вы добавили. Чем их больше, тем точнее подбор.
const libraryPalettes = [
  ['#4A1A1A', '#7A2A2A', '#C24A3A', '#E87A5A', '#F4A67A'],
  ['#3A0A2A', '#6A1A4A', '#C04A3A', '#E87A5A', '#F4AA7A'],
  ['#4A0A0A', '#8A2A1A', '#C85A2A', '#E88A4A', '#F4BA7A'],
  ['#8A0A3A', '#D03A4A', '#F06A4A', '#F89A6A', '#FCBA8A'],
  ['#C8B02A', '#D8D04A', '#E8E87A', '#F0F0AA', '#F8F8D0'],
  ['#3A5A2A', '#5A7A3A', '#7A9A4A', '#9ABA5A', '#BADA6A'],
  ['#5A7A2A', '#8AAA3A', '#AACA5A', '#C8EA7A', '#E8FAAA'],
  ['#3A4A1A', '#5A6A2A', '#7A8A3A', '#9AAA4A', '#BAC85A'],
  ['#2A4A4A', '#3A6A5A', '#5A8A7A', '#7AAA9A', '#9ACABA'],
  ['#1A2A3A', '#2A4A5A', '#4A6A7A', '#6A8A9A', '#8AAABA'],
  ['#2A3A5A', '#3A5A7A', '#5A7A9A', '#7A9ABA', '#9ABADA'],
  ['#3A6A4A', '#5A8A5A', '#7AAA7A', '#9ACA9A', '#BAEABA'],
  ['#2A4A3A', '#4A6A4A', '#6A8A5A', '#8AAA7A', '#AACA9A'],
  ['#1A3A5A', '#2A5A7A', '#3A7A9A', '#5A9ABA', '#7ABADA'],
  ['#3A5A7A', '#4A7A9A', '#6A9ABA', '#8ABADA', '#AADADA'],
  ['#3A6A9A', '#5A8ABA', '#7AAADA', '#9ACAF0', '#BAEAF8'],
  ['#6A9ACA', '#8ABAE0', '#AADAF0', '#CAF0F8', '#E0F8FA'],
  ['#7AAACA', '#9ACAE0', '#BAEAF0', '#D0F0F8', '#E8FAFA'],
  ['#3A4A6A', '#4A6A8A', '#6A8AAA', '#8AAACA', '#AACAE0'],
  ['#4A3A6A', '#6A4A8A', '#8A6AAA', '#AA8ACA', '#CAAAE0'],
  ['#2A2A4A', '#3A3A6A', '#5A4A8A', '#7A6AAA', '#9A8ACA'],
  ['#3A2A5A', '#5A3A7A', '#7A5A9A', '#9A7ABA', '#BA9ADA'],
  ['#6A4A8A', '#8A6AAA', '#AA8ACA', '#CAAAE0', '#E0CAF0'],
  ['#5A3A7A', '#7A5A9A', '#9A7ABA', '#BA9ADA', '#DABAF0'],
  ['#3A4A8A', '#5A6AAA', '#7A8ACA', '#9AAAE0', '#BACAF0'],
  ['#5A3A8A', '#7A5AAA', '#9A7ACA', '#BA9AE0', '#DABAF0'],
  ['#C86A8A', '#E08AAA', '#F0AAC0', '#F8CAD0', '#FCE0E0'],
  ['#D0AA6A', '#E0C08A', '#F0D0AA', '#F8E0C0', '#FCF0D0'],
  ['#2A1A3A', '#3A2A5A', '#5A3A7A', '#7A5A9A', '#9A7ABA'],
  ['#6A4A6A', '#8A6A8A', '#AA8AAA', '#CAAACA', '#E0CAE0'],
  ['#C86A6A', '#E08A8A', '#F0AAAA', '#F8CACA', '#FCE0E0'],
  ['#D0A07A', '#E0B89A', '#F0D0BA', '#F8E0D0', '#FCF0E8'],
  ['#3A1A1A', '#5A2A2A', '#8A3A3A', '#B05A4A', '#D07A6A'],
  ['#2A1A3A', '#4A2A5A', '#7A3A7A', '#A05A9A', '#C07ABA'],
  ['#3A1A2A', '#6A2A3A', '#9A3A4A', '#C05A5A', '#E07A7A'],
  ['#4A2A1A', '#7A3A2A', '#AA5A3A', '#D07A5A', '#E89A7A'],
  ['#5A4A1A', '#8A6A2A', '#AA8A3A', '#CAAA5A', '#E0C87A'],
  ['#3A4A2A', '#5A6A3A', '#7A8A5A', '#9AAA7A', '#BAC89A'],
  ['#4A5A2A', '#6A7A3A', '#8A9A5A', '#AABA7A', '#CAD89A'],
  ['#2A3A1A', '#4A5A2A', '#6A7A3A', '#8A9A5A', '#AABA7A'],
  ['#3A5A2A', '#5A7A3A', '#7A9A4A', '#9ABA5A', '#BAD87A'],
  ['#1A2A3A', '#2A4A5A', '#4A6A7A', '#6A8A9A', '#8AAABA'],
  ['#2A3A4A', '#3A5A6A', '#5A7A8A', '#7A9AAA', '#9ABACA'],
  ['#3A5A6A', '#4A7A8A', '#6A9AAA', '#8ABACA', '#AADACA'],
  ['#2A4A5A', '#3A6A7A', '#5A8A9A', '#7AAABA', '#9ACADA'],
  ['#4A6A7A', '#5A8A9A', '#7AAABA', '#9ACADA', '#BAE8F0'],
  ['#6A8A9A', '#7AAABA', '#9ACADA', '#BAE8F0', '#D0F0F8'],
  ['#3A4A5A', '#4A6A7A', '#6A8A9A', '#8AAABA', '#AACADA'],
  ['#4A5A6A', '#5A7A8A', '#7A9AAA', '#9ABACA', '#BADAE0'],
  ['#5A6A7A', '#6A8A9A', '#8AAABA', '#AACADA', '#CAE8F0'],
  ['#3A3A5A', '#4A4A7A', '#6A5A9A', '#8A7ABA', '#AA9ADA'],
  ['#4A3A6A', '#5A4A8A', '#7A5AAA', '#9A7ACA', '#BA9AE0'],
  ['#3A3A6A', '#4A4A8A', '#6A5AAA', '#8A7ACA', '#AA9AE0'],
  ['#4A4A7A', '#5A5A9A', '#7A7ABA', '#9A9ADA', '#BABAF0'],
  ['#5A4A8A', '#6A5AAA', '#8A7ACA', '#AA9AE0', '#CABAF0'],
  ['#6A5A9A', '#7A6ABA', '#9A8ADA', '#BAAAF0', '#DACAF8'],
  ['#4A5A7A', '#5A7A9A', '#7A9ABA', '#9ABADA', '#BADAF0'],
  ['#5A6A8A', '#6A8AAA', '#8AAACA', '#AACAE0', '#CAE8F0'],
  ['#6A7A9A', '#7A9ABA', '#9ABADA', '#BADAF0', '#DAF0F8'],
  ['#7A8AAA', '#8AAACA', '#AACAE0', '#CAE8F0', '#E0F0F8'],
  ['#8A9ABA', '#9ABADA', '#BADAF0', '#DAF0F8', '#F0F8FA'],
  ['#9AAACA', '#AACAE0', '#CAE8F0', '#E0F0F8', '#F0FAFA'],
  ['#9B5BA5', '#B57FB5', '#D9B3D9', '#F0D9F0', '#F7EBF0'],
  ['#2E1B1B', '#8B3A3A', '#C95A3A', '#D98A3A', '#E8BA5A'],
  ['#FADCE6', '#F2A8C8', '#D96AA0', '#C03A7A', '#A82A5A'],
  ['#FAF2D9', '#C8E0F0', '#8AC8E8', '#6A78C0', '#B870D0'],
  ['#4A2A8A', '#3A5AC8', '#6ABAE0', '#A8E8D9', '#D9F2EA'],
  ['#FADCF0', '#E8A8D0', '#A86AC0', '#6A3A8A', '#2A1A4A'],
  ['#E8F5D9', '#B0D0A8', '#78A080', '#4A6A6A', '#8A8A9A'],
  ['#C8A0F0', '#A870E0', '#8A40C8', '#6A60D0', '#60B0E8'],
  ['#C8A0D0', '#B880C0', '#E8C0D0', '#F0E0E8', '#D0B0C0'],
  ['#D0C8D0', '#B0A8B0', '#C8B8C0', '#D8A8A0', '#E8D0C0'],
  ['#D0A0D0', '#C080C0', '#A060A0', '#4A2A4A', '#C8A080'],
  ['#4A1A4A', '#2A1A8A', '#4A8AD0', '#D0E8D0', '#E8A0A0'],
  ['#6AB8E0', '#4A90D0', '#2A4A8A', '#4A2A6A', '#D040A0'],
  ['#2A2A4A', '#6A4A6A', '#D0804A', '#E8A85A', '#F0D8A0'],
  ['#8AE0E8', '#A8E8D0', '#D0F0D0', '#F0D8A0', '#F0B8A0'],
  ['#2A1A1A', '#5A4A3A', '#8A6A5A', '#C88A5A', '#E8AA5A'],
  ['#F0B8C0', '#F0E8E8', '#D0E8E8', '#B0D0D0', '#6A7A8A'],
  ['#7A4A2A', '#A87A3A', '#D0A85A', '#E8C87A', '#F0E0A0'],
  ['#2A6AB0', '#3A90C8', '#5AB8D8', '#A0E0A0', '#E8F0C8'],
  ['#E8A080', '#D08070', '#C06060', '#A84040', '#6A2A2A'],
  ['#F0E8C8', '#C8A8A0', '#9A7A7A', '#6A4A5A', '#2A2A3A'],
  ['#E8A05A', '#E8C07A', '#E8D09A', '#5A7AB0', '#3A5A8A'],
  ['#D0E8D0', '#A0C8A0', '#7AA07A', '#5A6A5A', '#4A3A3A'],
  ['#F0E0A8', '#E8C06A', '#C08A4A', '#8A3A5A', '#4A1A3A'],
  ['#A8A8D0', '#7A7AB0', '#5A5A8A', '#3A3A6A', '#1A1A3A'],
  ['#3A2A3A', '#5A4A5A', '#8A7A7A', '#B09A8A', '#C08A6A'],
  ['#6A8A5A', '#A8B87A', '#C8A05A', '#A86A3A', '#7A3A2A'],
  ['#7A9A6A', '#C8D0A0', '#F0E8C8', '#A06A6A', '#8A3A4A'],
  ['#F8D7E0', '#F0A8C0', '#D8709A', '#B8406A', '#8A2040'],
  ['#D03040', '#A01828', '#780810', '#4A0008', '#2A0000'],
  ['#A8D8E8', '#68B0D0', '#3880B0', '#18508A', '#0A2860'],
  ['#6A50A0', '#4A3078', '#30185A', '#18083A', '#0A0020'],
  ['#D8884A', '#C0682A', '#A84A18', '#782A08', '#4A1000'],
  ['#A8B8D0', '#8898B0', '#6878A0', '#485888', '#283860'],
  ['#E8D060', '#D0B830', '#B09018', '#887008', '#5A4800'],
  ['#E8E0D0', '#C8C0A8', '#A09880', '#787060', '#484030'],
  ['#70D0B0', '#40A080', '#207060', '#004840', '#002820'],
  ['#F0C8B0', '#D8A088', '#C07858', '#A05038', '#783020'],
  ['#3A2820', '#5A4038', '#A88878', '#A0B0B8', '#D0E8F0'],
  ['#3A3A2A', '#5A5A4A', '#788088', '#98B0D0', '#B8E0F0'],
  ['#3A3A3A', '#6A5A4A', '#A0A0A8', '#C8C8D0', '#E8E8F0'],
  ['#4A1830', '#682848', '#A84880', '#684880', '#90E8D0'],
  ['#2A1840', '#482868', '#785090', '#C890D0', '#A0F0D8'],
  ['#2A2A40', '#4A4A68', '#686888', '#A0A0C0', '#C0F8E8'],
  ['#1A1A30', '#3A3A60', '#585878', '#D0A060', '#F8E8D0'],
  ['#4A4838', '#686858', '#808078', '#D0B060', '#F8F0C0'],
  ['#1A1A38', '#3A3A58', '#5A5A78', '#E87040', '#F8C880'],
  ['#4A3028', '#5A5050', '#708090', '#88A8B8', '#C8E0F0'],
  ['#283050', '#384870', '#684890', '#A84090', '#90F0D0'],
  ['#283058', '#384870', '#5858A0', '#F06040', '#F8C880'],
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
];


// Функция для лёгкого "смешивания" цветов, чтобы не было скучно
function mutateColor(hex, hueShift, satShift, lightShift) {
  const color = chroma(hex);
  let [h, s, l] = color.hsl();
  
  h = (h + hueShift + 360) % 360;
  s = Math.min(1, Math.max(0.1, s + satShift));
  l = Math.min(0.95, Math.max(0.1, l + lightShift));
  
  return chroma.hsl(h, s, l).hex();
}

// Главная функция
function generatePalettes(baseColor) {
  palettesContainer.innerHTML = '';
  
  const baseColorObj = chroma(baseColor);
  const baseHue = baseColorObj.hsl()[0];
  
  // Сортируем библиотеку по близости к введённому цвету
  let sortedPalettes = libraryPalettes.map(pal => {
    const avgColor = chroma(pal[2]); // берём центральный цвет палитры как эталон
    let diff = Math.abs(baseHue - avgColor.hsl()[0]);
    if (diff > 180) diff = 360 - diff;
    return { pal, diff };
  });
  
  sortedPalettes.sort((a, b) => a.diff - b.diff);
  
  // Берём 5 самых подходящих палитр
  const top5 = sortedPalettes.slice(0, 5);
  
  // Перемешиваем их, чтобы порядок менялся
  top5.sort(() => Math.random() - 0.5);

  // Названия для каждой палитры
  const names = [' ', ' ', ' ', ' ', ' '];

  top5.forEach(({ pal }, index) => {
    // Случайные мутации, чтобы палитры были уникальными каждый раз
    const hueShift = (Math.random() - 0.5) * 12;
    const satShift = (Math.random() - 0.5) * 0.15;
    const lightShift = (Math.random() - 0.5) * 0.15;
    
    const finalPalette = pal.map(hex => mutateColor(hex, hueShift, satShift, lightShift));

    const section = document.createElement('div');
    section.className = 'palette-section';

    const label = document.createElement('div');
    label.className = 'palette-label';
    label.textContent = `${names[index % names.length]} (вариант ${index + 1})`;

    const row = document.createElement('div');
    row.className = 'palette-row';

    finalPalette.forEach(hex => {
      const swatch = document.createElement('div');
      swatch.className = 'swatch';
      swatch.style.backgroundColor = hex;
      swatch.addEventListener('click', () => copyToClipboard(hex));

      const code = document.createElement('span');
      code.className = 'swatch-code';
      code.textContent = hex.toUpperCase();

      swatch.appendChild(code);
      row.appendChild(swatch);
    });

    section.appendChild(label);
    section.appendChild(row);
    palettesContainer.appendChild(section);
  });
}

function updateColor(hex) {
  const normalized = hex.startsWith('#') ? hex : '#' + hex;

  input.value = normalized;
  picker.value = normalized;
  colorPreview.style.backgroundColor = normalized;
  document.documentElement.style.setProperty('--accent', normalized);

  if (chroma.valid(normalized)) {
    generatePalettes(normalized);
  }
}


input.addEventListener('input', (e) => {
  let val = e.target.value.trim();
  if (val && !val.startsWith('#')) val = '#' + val;
  
  if (chroma.valid(val)) {
    updateColor(val);
  } else if (val === '#' || val === '') {
    colorPreview.style.backgroundColor = 'transparent';
  }
});

picker.addEventListener('input', (e) => updateColor(e.target.value));

randomBtn.addEventListener('click', () => updateColor(randomHex()));

updateColor('#FF6B6B');