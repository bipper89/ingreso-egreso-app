export class User {

  public uid: string;
  public nombre: string;
  public email: string;
  constructor(usuario: UsuarioI) {
    this.uid =  usuario && usuario.uid || null;
    this.nombre = usuario && usuario.nombre || null;
    this.email = usuario && usuario.email || null;
  }

}

interface UsuarioI {
  uid: string;
  email: string;
  nombre: string;
}
