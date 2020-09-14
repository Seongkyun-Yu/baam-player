let musics = [];
let playlist = [];
let lenderList = [];
let navState = 'all';
let loginUser;

const $musics = document.querySelector('.musics');

const render = data => {
  // let str = '';
  // let renderTodos = navState === 'all' ? todos : navState === 'active' ? todos.filter(todo => !todo.completed) : todos.filter(todo => todo.completed);
  // renderTodos = renderTodos.sort((todo1, todo2) => todo2.id - todo1.id);
  // renderTodos.forEach(({ id, content, completed }) => {
  //   str += `<li id="${id}" class="todo-item">
  //             <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
  //             <label for="ck-${id}">${content}</label>
  //             <i class="remove-todo far fa-times-circle"></i>
  //           </li>`;
  // });
  // $completedTodos.textContent = todos.filter(todo => todo.completed).length;
  // $activeTodos.textContent = todos.filter(todo => !todo.completed).length;
  $musics.innerHTML = JSON.stringify(data);
  console.log(typeof data);
};

const generateId = () => (todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1);


// login funcs
const login = async (e) => {
  const id = 'ysungkoon'
  const password = '1111'

  const {data} = await axios.post('/login', { id, password });
  loginUser = data;
  render(loginUser);
};
// login('testEvent')

// signup funcs
const signup = async (e) => {
  const id = 'ysungkon';
  const password = '1111';
  const name = '유성균';

  const {data} = await axios.post('/signin', { id, password, name });
  loginUser = data;
  render(loginUser);
};
// signin('testEvent')


// Get data funcs
const getMusics = async (e) => {
  const {data} = await axios.get('/musics');
  musics = data;
  render(musics);
};

const getTop10Musics = async (e) => {
  const {data} = await axios.get('/top10');
  musics = data;
  render(musics);
};

const getPlaylist = async (e) => {
  const id = 'ysungkoon';

  const {data} = await axios.post('/playlist', { id });
  playlist = data;
  render(playlist);
};

const getFavorite = async (e) => {
  const id = 'ysungkoon';

  const {data} = await axios.post('/favorite', { id });
  playlist = data;
  render(playlist);
};

const getTypeList = async (e) => {
  const type = 'hiphop';

  const {data} = await axios.post('/typelist', { type });
  lenderList = data;
  render(lenderList);
};
// getTypeList('testEvent');

const addPlaylist = async (e) => {
  const id = 'ysungkoon';
  const title = 'Nightingale';

  const { data } = await axios.post('/addplaylist', { id, title });
  playlist = data;
  render(playlist);
};
// addPlaylist('testEvent');

const addFavorite = async (e) => {
  const id = 'ysungkoon';
  const title = 'Nightingale';

  const {data} = await axios.post('/addFavorite', { id, title });
  playlist = data;
  render(playlist);
};
// addFavorite('testEvent');

const deletePlaylist = async (e) => {
  const id = 'ysungkoon';
  const deleteIndex = 0;

  const {data} = await axios.patch('/deleteplaylist', { id, deleteIndex });
  playlist = data;
  render(playlist);
};
// deletePlaylist('testEvent');

const deleteFavorite = async (e) => {
  const id = 'ysungkoon';
  const deleteIndex = 0;

  const { data } = await axios.patch('/deletefavorite', { id, deleteIndex });
  playlist = data;
  render(playlist);
};
// deleteFavorite('testEvent');


// 결제모듈
const startPay = async (e) => {
  const { data } = await axios.get('/key');
  const key = data;

  BootPay.request({
    price: '3000',
    application_id: key.application_id,
    name: 'Bamm player 월정기권',
    pg: '',
    method: '',
    show_agree_window: 0,
    items: [
      {
        item_name: 'Bamm player 월정기권',
        qty: 1, //수량
        unique: '123', // 해당 상품을 구분짓는 primary key
        price: 3000, // 상품 단가
        cat1: '이용권' // 대표 상품의 카테고리 상, 50글자 이내
        // cat2: '티셔츠', // 대표 상품의 카테고리 중, 50글자 이내
        // cat3: '라운드 티', // 대표상품의 카테고리 하, 50글자 이내
      }
    ],
    user_info: {
      username: '유성균',
      email: 'ysungkyun@gmail.com',
      addr: '',
      phone: '010-1234-4567'
    },
    order_id: '123456789',
    params: { callback1: '그대로 콜백받을 변수 1', callback2: '그대로 콜백받을 변수 2', customvar1234: '변수명도 마음대로'},
    account_expire_at: '2020-05-25',
    extra: {
      start_at: '2020-05-10',
      end_at: '2022-05-10',
      vbank_result: 1,
      quota: '0,2,3'
    }
  }).error((data) => {
    // 결제 에러시 진행
  }).cancel((data) => {
    // 결제 취소시 진행
  }).ready((data) => {
    // 가상계좌 발급시 진행
  }).confirm((data) => {
    // 결제 진행 전 요건 확인 (재고 확인 같은것)
    var enable = true;
    if (enable) {
      BootPay.transactionConfirm(data);
    } else {
      BootPay.removePaymentWindow();
    }
  }).close((data) => {
    // 결제창이 닫힐 때 작동 (결제 성공, 실패 안가림)

  }).done(async (data) => {
    // 결제 완료시 작동
    const confirm = await axios.post('/confirm', { data });
  });
};

// startPay('test');
