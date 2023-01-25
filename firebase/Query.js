import { firestore } from './firebase.js';
const { query, where, collection, getDocs, collectionGroup } = firestore

import { EventEmitter } from 'https://hamilsauce.github.io/hamhelper/event-emitter.js';
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { utils } = ham;

const QueryOptions = {
  params: {
    fieldName: null,
    operator: null,
    fieldValue: null,
  }
}



export class Query extends EventEmitter {
  #collectionName = null;
  #params = {
    fieldName: null,
    operator: null,
    fieldValue: null,
  }
  constructor(collectionName, queryOptions = {}) {
    super();

    if (!name) throw new Error('Invalid or no name or type passed to constructor for ', this.constructor.name);

    if (queryOptions && queryOptions.params) {
      this.#setParams(queryOptions.params)
    }

    this.#collectionName = collectionName;

    this.#id = Query.#uuid(collectionName);
  };

  get collectionName() { return this.#collectionName };

  get id() { return this.#id };

  get isValid() { return Object.values(this.#params).every(_ = !!_) };

  static #uuid(collectionName) {
    return `${(collectionName || 'o').slice(0,1).toLowerCase()}${utils.uuid()}`;
  }

  static create(collectionName, options = {}) {
    return new Query(collectionName, options)
  }

  #setParams(params) {
    this.#params = { ...this.#params, ...params };

    return this;
  }

  where(fieldName) {
    if (!(!!this.#params.fieldName) || this.#params.fieldName === fieldName) {
      this.#setParams({ fieldName })
      // return new Query(this.collectionName, { fieldName })
    }

    // console.error('QUERY.WHERE: FIELDNAME ALREADY SET AS ' + this.#params.fieldName);

    return this;
  }

  equals(operator) {
    if (!(!!this.#params.operator) || this.#params.operator === operator) {
      this.#setParams({ operator })
      // return new Query(this.collectionName, { operator })
    }

    // console.error('QUERY.EQUALS: OPERATOR ALREADY SET AS ' + this.#params.operator);

    return this;
  }

  equals(fieldValue) {
    if (!(!!this.#params.fieldValue) || this.#params.fieldValue === fieldValue) {
      this.#setParams({ fieldValue })
      // return new Query(this.collectionName, { fieldValue })
    }

    // console.error('QUERY.EQUALS: FIELDVALUE ALREADY SET AS ' + this.#params.fieldValue);

    return this;
  }
  
};