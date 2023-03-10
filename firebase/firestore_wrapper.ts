import * as admin from 'firebase-admin';
import { Firestore, CollectionReference, Query, DocumentData, Timestamp } from '@google-cloud/firestore';
import { IDataRepository } from './IDataRepository';

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/**
 * @class FirestoreRepository
 */
export class FirestoreRepository implements IDataRepository {
  private _db: Firestore;
  private _collectionRef: CollectionReference;
  private _query: Query;

  /**
   * Constructor
   * @param collectionName The collection name
   */
  constructor(collectionName: string = '') {
    this._db = admin.firestore();
    if (collectionName != '') this.setCollection(collectionName);
  }

  /**
   * Set collection name 5000
   * @param collectionName The collection name
   */
  public setCollection(collectionName: string): void {
    if (collectionName != '') {
      this._collectionRef = this._db.collection(collectionName);
    } else {
      console.log("Collection name cannot be empty.");
    }
  }

  /**
   * Get documents in a collection
   * @param conditions Array of conditions
   * @param orderBy Field name to order by
   * @param limit Number of documents to retrieve
   * @returns Array of Document objects
   */
  public async get(conditions: Array < Condition > = null, orderBy: Array < OrderBy > = null, limit: number = null): Promise < Document[] > {
    const documents: Array < Document > = [];

    this._query = this._collectionRef;

    if (this._isCollectionSet) {
      this._setConditions(conditions);
      this._setSorting(orderBy);
      this._setLimit(limit);

      try {
        (await this._query.get())
        .forEach(doc => {
          documents.push({
            id: doc.id,
            data: doc.data()
          });
        });
      } catch (error) {
        console.log(error);
      }
    }

    return documents;
  }

  /**
   * Get a document by ID
   * @param id The document ID
   * @returns A Document object or null
   */
  public async getById(id: string): Promise < Document > {
    let document: Document = null;

    if (this._isCollectionSet) {
      try {
        const doc = await this._collectionRef.doc(id).get();

        if (doc.exists) {
          document = {
            id: doc.id,
            data: doc.data()
          }
        } else {
          console.log("Document not found.");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return document;
  }

  /**
   * Add a document
   * @param data The document object
   * @param id The document ID
   * @returns ResultData object or null
   */
  public async add(data: Object, id: string = null): Promise < ResultData > {
    let resultData: ResultData = null;

    if (this._isCollectionSet) {
      try {
        const result: any = id ? await this._collectionRef.doc(id).set(data) : await this._collectionRef.add(data);
        resultData = {
          document: {
            id: id ? id : result.id,
            data: data
          },
          writeTime: result.writeTime ? result.writeTime : null
        };
      } catch (error) {
        console.log(error);
      }
    }

    return resultData;
  }

  /**
   * Add multiple documents
   * @param dataArr Array of document objects
   * @returns ResultData object or null
   */
  public async batchAdd(dataArr: Array < Object > ): Promise < boolean > {
    let result: boolean = false;

    if (this._isCollectionSet) {
      const batch = this._db.batch();

      dataArr.forEach(data => {
        batch.set(this._collectionRef.doc(), data);
      });

      try {
        await batch.commit();
        result = true;
      } catch (error) {
        console.log(error);
      }
    }

    return result;
  }

  /**
   * Update a document
   * @param data The document object
   * @param id The document ID
   * @param isMerge If true, data will merge into existing document. Default is false.
   * @returns ResultData object or null
   */
  public async update(data: Object, id: string, isMerge: boolean = false): Promise < ResultData > {
    let resultData: ResultData = null;

    if (this._isCollectionSet) {
      try {
        const result = await this._collectionRef.doc(id).set(data, { merge: isMerge });
        resultData = {
          document: {
            id: id,
            data: data
          },
          writeTime: result.writeTime ? result.writeTime : null
        };
      } catch (error) {
        console.log(error);
      }
    }

    return resultData;
  }

  /**
   * Delete a document
   * @param id The document ID
   * @returns ResultData object or null
   */
  public async delete(id: string): Promise < ResultData > {
    let resultData: ResultData = null;

    if (this._isCollectionSet) {
      try {
        const doc = (await this._collectionRef.doc(id).get());

        if (doc.exists) {
          const result = await this._collectionRef.doc(id).delete();
          resultData = {
            writeTime: result.writeTime,
            document: {
              id: id,
              data: doc.data()
            }
          }
        } else {
          console.log("Document does not exist.");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return resultData;
  }

  private get _isCollectionSet(): boolean {
    let result: boolean = false;

    if (this._collectionRef) {
      result = true;
    } else {
      console.log("Collection is not set.");
    }

    return result;
  }

  private _setConditions(conditions: Array < Condition > ): void {
    if (conditions && conditions.length > 0) {
      conditions.forEach(condition => {
        this._query = this._query.where(condition.field, condition.operator, condition.value);
      });
    }
  }

  private _setSorting(orderBy: Array < OrderBy > ): void {
    if (orderBy && orderBy.length > 0) {
      orderBy.forEach(order => {
        this._query = this._query.orderBy(order.field, order.sort || 'asc');
      })
    }
  }

  private _setLimit(limit: number): void {
    if (limit) {
      this._query = this._query.limit(limit);
    }
  }
}

// @Types
export interface Document {
  id: string;
  data: DocumentData;
}

export interface ResultData {
  document: Document;
  writeTime ? : Timestamp;
}

export interface Condition {
  field: string;
  operator: Operators;
  value: any;
}

export interface OrderBy {
  field: string;
  sort: SortType;
}

export enum Operators {
  LessThan = '>',
    LessThanOrEqual = '<=',
    Equal = '==',
    GreaterThan = '>',
    GreaterThanOrEqual = '>='
}

export enum SortType {
  Ascending = 'asc',
    Descending = 'desc'
}