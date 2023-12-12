import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private fs: Firestore) { }

  // Devuelve una coleccion entera
  getCollection(coleccion: string) {
    const collectionRef = collection(this.fs, coleccion);
    return collectionData(collectionRef, { idField: "id" }) as Observable<any[]>;
  }

  // Devuelve un documento por su Id
  getDocumentById(id: string, coleccion: string) {
    const documentRef = doc(this.fs, coleccion + "/" + id);
    return docData(documentRef, { idField: "id" }) as Observable<any>;
  }

  // Devuelve el resultado de una consulta simple
  queryCollection(coleccion: string, campo: string, valor: string) {
    const collectionRef = collection(this.fs, coleccion);
    const queryRef = query(collectionRef, where(campo, "==", valor));
    return collectionData(queryRef, { idField: "id" }) as Observable<any[]>;
  }

  // Crea un nuevo documento
  newDocument(objeto: any, coleccion: string) {
    const collectionRef = collection(this.fs, coleccion);
    return addDoc(collectionRef, objeto) as Promise<any>;
  }

  // Actualiza un documento
  updateDocument(objeto: any, coleccion: string) {
    const docRef = doc(this.fs, coleccion+"/"+objeto.id);
    return updateDoc(docRef, objeto); // Devuelve una promesa
  }

  // Borra un documento
  deleteDocument(id: string, coleccion: string) {
    const docRef = doc(this.fs, coleccion + "/" + id);
    return deleteDoc(docRef);
  }
}
