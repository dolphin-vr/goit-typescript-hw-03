class Key {
   private signature: string = Math.random().toString(32);

   getSignature(): string {
      return this.signature;
   }
}

class Person {
   constructor(private key: Key){ }

   getKey(): Key {
      return this.key;
   }
}

abstract class House {
   constructor(protected key: Key){}
   protected door = false;
   protected tenants: Person[];

   public comeIn(person: Person){
      if (this.door) {
         console.log('Welcome home!');
         this.tenants.push(person);
         this.door = false;
      } else {
         console.log('Alarm!!! Thieves!')
      }
   };

   abstract openDoor(key: Key): void;
}

class MyHouse extends House {
   public openDoor(key: Key): void {
      if (this.key === key) {
         this.door = true
      }
   }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);

const key1 = new Key();
const thief = new Person(key1);
house.openDoor(thief.getKey());
house.comeIn(thief);

export {};