import {
  Entity,
  Column,
  PrimaryColumn
} from "typeorm";
import Validable, {
  Constraint,
  ConstraintBuilder
} from "salamander/src/service/Validable";


@Entity()
export class User implements Validable {
  getConstraints(builder: ConstraintBuilder): Constraint {
    return builder
      .object()
      .keys({
        emailAddress: builder.string().email({ minDomainAtoms: 2 }),
      })
      .unknown(true);
  }

  @PrimaryColumn()
  id: string;

  @Column()
  emailAddress: string;

  @Column()
  password: string;

  @Column()
  role: string = "user";

  @Column()
  createdAt: Date;

  @Column()
  lastLoginAt: Date;

  @Column()
  code: string;
}
