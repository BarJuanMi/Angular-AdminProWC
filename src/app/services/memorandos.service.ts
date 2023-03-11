import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay, tap } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { Memorando } from '../models/memorando.model';
import { CargarMemorando } from '../interfaces/cargar-memorandos.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MemorandosService {

  constructor( private http: HttpClient, 
    private router: Router,
    public usuarioService: UsuarioService) { }

  /**
   * Metodo que permite cargar todos los memorandos que se encuentren en la base de datos.
   * @param desde es el filtro desde donde marcara para obtener los memorando desde ahi en adelante.
   * @returns Listado de memorandos.
   */
  cargarMemorandosDesde( desde: number = 0) {
  console.log('Invocación a MemorandosService(Front) - cargarMemorandosDesde');
  //44.208.35.77:3001/api/memorandos?desde=25
  const url = `${ base_url }/memorandos?desde=${ desde }`;
  return this.http.get<CargarMemorando>( url , this.usuarioService.headers)
    .pipe(
      delay(500), 
      map( resp => {
        const memorandos = resp.memorandos.map( 
          memorando => new Memorando(memorando._id, memorando.empleado, memorando.emplNomApel, memorando.estado,
                                    memorando.usuarioRegistro, memorando.fechaRegistro, memorando.descripcion,
                                    memorando.normaInfringida, memorando.posiblesConsecuencias, memorando.fechaEvento, memorando.respuestaDeMemo, 
                                    memorando.fechaCargoPDF, memorando.usuarioCargoPDF, memorando.pathPDF, memorando.estadoCargoPDF)
        );
        
        return {
          total: resp.total,
          memorandos
        };
      })
    )
  }

  /**
   * Metodo que permite cargar un memorando en especifico buscandolo mediante su id interno
   * @param id numero de representacion del memorando dentro de la base de datos
   * @returns Objeto de memorando que fue retornado por la base de datos
   */
   buscarMemorandoPorId( id: String) {
    console.log('Invocacion a MemorandosService(Front) - buscarMemorandoPorId');
    const url = `${ base_url }/memorandos/buscarRegMemorandoId/${ id }`;
    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.memorando));
  }

  /**
   * Metodo que permite crear un registro de memorando nuevo en la base de datos
   * @param formData Objeto con la informacion del nuevo memorando
   * @returns Informacion del proceso si fue o no exitoso en la insercion
   */
   crearNuevoMemorando( formData: RegisterForm ) {
    console.log('Invocación a MemorandosService(Front) - crearNuevoMemorando');
    return this.http.post(`${base_url}/memorandos/crearRegMemorando`, formData, this.usuarioService.headers);
  }
  
  /**
   * Metodo que permite eliminar un registro de memorando en la base de datos
   * @param memorando Objeto con la informacion del memorando que se va a eliminar
   * @returns Informacion del proceso si fue o no exitoso en la eliminacion
   */
  eliminarMemorando( memorando: Memorando) {
    console.log('Invocación a MemorandosService(Front) - eliminarMemorando');
    return this.http.delete(`${ base_url }/memorandos/eliminarRegMemorando/${ memorando._id }`, this.usuarioService.headers);
  }

  /**
   * Metodo que permite actualizar un registro de memorando en la base de datos
   * @param memorando Objeto con la informacion del memorando que se va a actualizar
   * @returns Informacion del proceso si fue o no exitoso en la actualizacion
   */
   actualizarMemorando( memorando: Memorando, estadoNew: string, respuesta: string) {
    console.log('Invocación a MemorandosService(Front) - actualizarMemorando');
    var jsonStruc = {estado: estadoNew, respuestaDeMemo: respuesta};
    return this.http.put(`${ base_url }/memorandos/actualizarRegMemorando/${ memorando._id }`, jsonStruc, this.usuarioService.headers)
    .pipe(tap ( (resp :any) => {resp}));
  }
}
