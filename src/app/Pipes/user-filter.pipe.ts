import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../Models/user';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: User[] | null, searchTerm: string): User[] | null {
    if (!users || !searchTerm) {
      return users;
    }

    const term = searchTerm.toLowerCase().trim();

    return users.filter(user =>
      user.userName.toLowerCase().includes(term) ||
      user.teNum.toLowerCase().includes(term)
    );
  }

}
