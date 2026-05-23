export default class NameGenerator {
  static generateName(prototype: string, type: string): string {
    return type.substr(0, 1).toUpperCase() + type.substr(1);
  }
}
