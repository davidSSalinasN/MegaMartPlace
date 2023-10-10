import listaProductos from '/src/assets/JSON/users.json';

export class Users{
  lista: any = null;
  private ENTIDAD_DATA = 'users';
  constructor(){
    if (localStorage.getItem(this.ENTIDAD_DATA)) {
      this.lista = JSON.parse(localStorage.getItem(this.ENTIDAD_DATA) || '{}');
    } else {
      this.lista = listaProductos;
      this.localStorageSave(this.ENTIDAD_DATA, JSON.stringify(this.lista));
    }
  }
  getListaUsuarios() {
    return this.lista;
  }
  private localStorageSave(entidad: any, data: string) {
    localStorage.setItem(entidad, data);
  }
}
