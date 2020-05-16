const initialState = [
  { group: 'deer', name: 'Олень', img: 'https://picsum.photos/id/1003/150/150'},
  { group: 'bear', name: 'Медведь', img: 'https://picsum.photos/id/1020/150/150' },
  { group: 'Eagle', name: 'Орел', img: 'https://picsum.photos/id/1024/150/150' },
  { group: 'dog', name: 'Собака', img: 'https://picsum.photos/id/1025/150/150' },
  { group: 'lioness', name: 'Львица', img: 'https://picsum.photos/id/1074/150/150' },
  { group: 'walrus', name: 'Морж', img: 'https://picsum.photos/id/1084/150/150' },
  { group: 'Leopard', name: 'Леопард', img: 'https://picsum.photos/id/219/150/150' },
  { group: 'cormorant', name: 'Баклан', img: 'https://picsum.photos/id/244/150/150' },
];

export default function animals(state = initialState, action) {
  switch (action) {
    default:
      return state;
  }
}
