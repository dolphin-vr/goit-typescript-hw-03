class Key {
   private signature: string = (Math.random()*1000).toString(32);

   public getSignature(): string {
      return this.signature;
   }
}

class Person {
   constructor(private key: Key){ }

   public getKey(): Key {
      return this.key;
   }
}

abstract class House {
   protected door = false;
   protected tenants: Person[] = [];
   constructor(protected key: Key){};

   public comeIn(person: Person): void {
      if (this.door) {
         this.tenants.push(person);
         console.log('Welcome home!');
         this.door = false;
      } else {
         console.log('Alarm!!! Thieves!')
      }
   };

   abstract openDoor(key: Key): void;
}

class MyHouse extends House {
   public openDoor(key: Key): void {
      if (this.key.getSignature() === key.getSignature()) {
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